import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets";
import { clientBaseURL, clientEndPoints } from "@/config";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import Form from "@/components/Form";
import Input from "@/components/Input";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = React.useRef([]);
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await clientBaseURL.post(clientEndPoints.sendResetOTP, {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await clientBaseURL.post(clientEndPoints.resetPassword, {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      {/* Email Input Form */}

      {!isEmailSent && (
        <Form
          onSubmit={onSubmitEmail}
          headingtxt="Reset Password"
          paragraphtxt="Enter your registered email address."
          btntxt="Verify email"
        >
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" className="w-3 h-3" />
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </Form>
      )}
      {/*OTP Input Form */}
      {!isOtpSubmitted && isEmailSent && (
        <Form
          onSubmit={onSubmitOTP}
          headingtxt="Reset Password OTP"
          paragraphtxt="Enter the 6-digit code sent to your email address."
          btntxt="Verify OTP"
        >
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}
          </div>
        </Form>
      )}
      {/*OTP RESET FORM END*/}

      {/*Enter New Password */}
      {isOtpSubmitted && isEmailSent && (
        <Form
          onSubmit={onSubmitNewPassword}
          headingtxt="New Password"
          paragraphtxt="Enter the new password"
          btntxt="Submit"
        >
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <Input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
        </Form>
      )}
    </Container>
  );
};

export default ResetPassword;
