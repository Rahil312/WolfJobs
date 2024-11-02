import { useState } from "react";
import { login } from "../../deprecateded/auth";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, TextField, Button } from "@mui/material";

type FormValues = {
  email: string;
  password: string;
  otp?: string;
};

const schema = yup.object({
  email: yup.string().email("Email format is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
  otp: yup.string().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);  // For managing the OTP step
  const [email, setEmail] = useState<string>("");  // To hold the email for OTP verification

  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "", otp: "" },
    resolver: yupResolver(schema),
  });
  
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // Initial login function
  const onSubmit = async (data: FormValues) => {
    if (!isOtpSent) {
      // First step - send login data to receive OTP
      try {
        const response = await axios.post("http://localhost:8000/api/v1/users/create-session", {
          email: data.email,
          password: data.password,
        });
        console.log("OTP sent to email:", data.email);
        setIsOtpSent(true);  // Move to OTP entry step
        setEmail(data.email);  // Save email for later OTP verification
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    } else {
      // Second step - verify OTP
      try {
        const response = await axios.post("http://localhost:8000/api/v1/users/verify-otp", {
          email: email,
          otp: data.otp,
        });
        console.log("OTP verified. Redirecting...");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    }
  };


  return (
    <div className="mx-auto bg-slate-50 content flex flex-col justify-center items-center">
      <div className="p-4 border rounded bg-white">
        <div className="text-xl justify-center text-black mb-4">
          {isOtpSent ? "Enter OTP" : "Sign In to your Account"}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            {!isOtpSent ? (
              <>
                {/* Email Field */}
                <TextField
                  label="Email Id"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": { paddingLeft: (theme) => theme.spacing(1.5), borderRadius: "10px" },
                  }}
                />
                {/* Password Field */}
                <TextField
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": { paddingLeft: (theme) => theme.spacing(1.5), borderRadius: "10px" },
                  }}
                />
              </>
            ) : (
              <TextField
                label="OTP"
                type="text"
                {...register("otp")}
                error={!!errors.otp}
                helperText={errors.otp?.message}
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": { paddingLeft: (theme) => theme.spacing(1.5), borderRadius: "10px" },
                }}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                background: "#FF5353",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              {isOtpSent ? "Submit OTP" : "Login"}
            </Button>
          </Stack>
        </form>
        {!isOtpSent && (
          <>
            <div className="mv-1 border-t mx-16" />
            <div className="flex justify-center">
              <p className="-mt-3 bg-white px-3 text-[#CCCCCC]">OR</p>
            </div>
            <p
              className="text-[#656565] text-center"
              onClick={() => navigate("/register")}
            >
              Create a new account
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
