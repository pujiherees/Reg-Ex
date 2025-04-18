document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
  
    const usernameRegex = /^[a-zA-Z0-9._]{5,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordNoSpacesRegex = /^[^\s]{8,20}$/;
    const passwordUppercaseRegex = /[A-Z]/;
    const passwordLowercaseRegex = /[a-z]/;
    const passwordSymbolRegex = /[!._%+-]/;
  
    function showError(inputElement, message) {
      let errorElement = inputElement.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("text-red-500")) {
        errorElement = document.createElement("p");
        errorElement.classList.add("text-red-500", "text-sm", "mt-1");
        inputElement.insertAdjacentElement("afterend", errorElement);
      }
      errorElement.textContent = message;
    }
  
    function clearError(inputElement) {
      const errorElement = inputElement.nextElementSibling;
      if (errorElement && errorElement.classList.contains("text-red-500")) {
        errorElement.remove();
      }
    }
  
    function validatePasswordLive() {
        const value = passwordInput.value;
      
        const rules = [
          {
            regex: passwordNoSpacesRegex,
            message: "At least 8-20 character and no spaces",
          },
          {
            regex: passwordUppercaseRegex,
            message: "At least 1 capital letter (A-Z)",
          },
          {
            regex: passwordLowercaseRegex,
            message: "At least 1 small letter (a-z)",
          },
          {
            regex: passwordSymbolRegex,
            message: "At least one spesial character (!._%+-)",
          },
        ];
      
        let ruleContainer = document.getElementById("password-rules");
      
        if (!ruleContainer) {
          ruleContainer = document.createElement("ul");
          ruleContainer.id = "password-rules";
          ruleContainer.classList.add("text-sm", "mt-2", "space-y-1");
          passwordInput.insertAdjacentElement("afterend", ruleContainer);
        }
      
        ruleContainer.innerHTML = "";
      
        rules.forEach((rule) => {
          const li = document.createElement("li");
          li.className = "flex items-center space-x-2";
      
          const icon = document.createElement("span");
          const text = document.createElement("span");
          text.textContent = rule.message;
      
          if (!passwordActivated || value === "") {
            icon.textContent = "•"; 
            icon.className = "text-gray-1000 font-bold";
            text.className = "text-gray-1000";
          } else {
            const passed = rule.regex.test(value);
            icon.textContent = passed ? "✔" : "✘";
            icon.className = passed ? "text-green-600 font-bold" : "text-red-500 font-bold";
            text.className = passed ? "text-green-600" : "text-red-500";
          }
      
          li.appendChild(icon);
          li.appendChild(text);
          ruleContainer.appendChild(li);
        });
      }
  
    let passwordActivated = false;
  
    passwordInput.addEventListener("focus", () => {
      if (!passwordActivated) {
        passwordActivated = true;
        validatePasswordLive();
      }
    });
  
    passwordInput.addEventListener("input", () => {
      if (passwordActivated) {
        validatePasswordLive();
      }
    });
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      let isValid = true;
  
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
  
      if (!usernameRegex.test(username)) {
        showError(usernameInput, "Username must consist of 5-20 characters");
        isValid = false;
      } else {
        clearError(usernameInput);
      }
  
      if (!emailRegex.test(email)) {
        showError(emailInput, "Invalid email format");
        isValid = false;
      } else {
        clearError(emailInput);
      }
  
      if (
        !passwordNoSpacesRegex.test(password) ||
        !passwordUppercaseRegex.test(password) ||
        !passwordLowercaseRegex.test(password) ||
        !passwordSymbolRegex.test(password)
      ) {
        showError(passwordInput, "Password does not meet all criteria");
        isValid = false;
      } else {
        clearError(passwordInput);
      }
  
      if (confirmPassword !== password || confirmPassword === "") {
        showError(confirmPasswordInput, "Password confirmation does not match.");
        isValid = false;
      } else {
        clearError(confirmPasswordInput);
      }
  
      if (isValid) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data sent successfully!",
          html: `
            <div class="text-left leading-relaxed">
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
          `,
          confirmButtonColor: "blue",
        });
  
        form.reset();
        document.getElementById("password-rules")?.remove();
        passwordActivated = false;
      }
    });
  });
  
  function togglePasswordVisibility() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;
  }