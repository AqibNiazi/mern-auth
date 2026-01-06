import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "@/context/AppContext";
import { clientBaseURL, clientEndPoints } from "@/config";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import Form from "@/components/Form";
const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const { isLoggedIn, userData, getUserData } = useContext(AppContext);

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const res = await clientBaseURL.post(clientEndPoints.verifyAccount, {
        otp,
      });
      console.log("res", res);

      if (res.data.success) {
        toast.success(res.data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);

  return (
    <Container>
      <Form
        onSubmit={onSubmitHandler}
        headingtxt="Email Verify OTP"
        paragraphtxt="Enter the 6-digit code sent to your email address."
        btntxt="Verify Email"
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
    </Container>
  );
};

export default EmailVerify;
