import { useEffect, useRef, useState } from "react";
import "./style.css";

function OTP({ count = 4, onChange = () => {} }) {
  const [opts, setOtps] = useState([]);
  const otpRefs = useRef([]);

  useEffect(() => {
    // Detect feature support via OTPCredential availability
    if ("OTPCredential" in window) {
      const input = document.querySelector(
        'input[autocomplete="one-time-code"]'
      );

      if (!input) return;
      // Set up an AbortController to use with the OTP request
      const ac = new AbortController();
      const form = input.closest("form");
      if (form) {
        // Abort the OTP request if the user attempts to submit the form manually
        form.addEventListener("submit", (e) => {
          ac.abort();
        });
      }

      // Request the OTP via get()
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          // When the OTP is received by the app client, enter it into the form
          // input and submit the form automatically
          alert("Your otp is", otp);
          // input.value = otp.code;
          // if (form) form.submit();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  function handleChange(index) {
    return (e) => {
      const old = [...opts];
      if (e.key === "Meta") {
        return;
      }
      if (e.key === "Backspace") {
        old[index] = "";

        if (otpRefs?.current[index - 1]) {
          otpRefs?.current[index - 1].focus();
        }
        setOtps(old);

        return;
      }

      console.log(e.target.value);
      old[index] = e.key;
      setOtps(old);

      if (otpRefs?.current[index + 1]) {
        otpRefs?.current[index + 1].focus();
      }
      console.log(old.join(""));
    };
  }

  return (
    <div className="otp">
      {[...new Array(count)].map((_, i) => {
        return (
          <input
            key={i}
            autoComplete="one-time-code"
            inputMode={i % 2 === 0 ? "numeric" : undefined}
            onPaste={(event) => {
              const pastedData = event.clipboardData
                .getData("text")
                .slice(0, 9); // Get paste
            }}
            ref={(e) => {
              otpRefs.current[i] = e;
            }}
            value={opts[i]}
            type="text"
            onKeyUp={handleChange(i)}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                alert(e.target.value);
              }
            }}
          />
        );
      })}

      <div>
        When focus is on me, and otp comes nothing will happen.
        <input type="text" placeholder="non autocomplete text" />
      </div>

      <div>
        When otp comes, i will be filled when u tap on otp
        <input
          type="text"
          autoComplete="one-time-code"
          placeholder="with autocomplete text"
        />
      </div>
    </div>
  );
}

export default OTP;
