import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import * as yup from "yup";

const formSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid Email address").required("Email is required"),
  organization: yup.string().required("Organization is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.string().required("Postal Code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol")
    .matches(/[A-Z]/, "Password must contain an uppercase letter"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [passwordMeetsCriteria, setPasswordMeetsCriteria] = useState({
    length: false,
    number: false,
    symbol: false,
    uppercase: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const password = watch("password");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2");
        const data = await res.json();
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setPasswordMeetsCriteria({
      length: password?.length >= 8,
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
    });
  }, [password]);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-fit max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 text-gray-700">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="col-span-2 md:col-span-1">
            <label htmlFor="firstname" className="block text-xs sm:text-sm font-medium">
              First name
            </label>
            <input
              id="firstname"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.firstname.message}</p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label htmlFor="lastname" className="block text-xs sm:text-sm font-medium">
              Last name
            </label>
            <input
              id="lastname"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.lastname.message}</p>
            )}
          </div>

          <div className="col-span-2 ">
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium">
              Email <span className="text-gray-400 cursor-help text-xs sm:text-sm">?</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
              {...register("email")}
            />
            {errors.email && <p className="text-red-600 text-xs sm:text-sm">{errors.email.message}</p>}
          </div>

          <div className="col-span-2">
            <label htmlFor="organization" className="block text-xs sm:text-sm font-medium">
              Organization Name <span className="text-gray-400 cursor-help text-xs sm:text-sm">?</span>
            </label>
            <input
              id="organization"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
              {...register("organization")}
            />
            {errors.organization && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.organization.message}</p>
            )}
          </div>

          <div className="col-span-1">
            <label htmlFor="country" className="block text-xs sm:text-sm font-medium">
              Country*
            </label>
            <select
              id="country"
              {...register("country")}
              defaultValue=""
              className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white text-gray-700"
            >
              <option value="" disabled>
                Select
              </option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="col-span-1">
            <label htmlFor="postalCode" className="block text-xs sm:text-sm font-medium">
              Postal code*
            </label>
            <input
              id="postalCode"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.postalCode.message}</p>
            )}
          </div>

          <div className="col-span-2 ">
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm pr-10"
                {...register("password")}
              />
              <span
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm mt-1 text-gray-500">
              <span className={passwordMeetsCriteria.length ? "text-green-600" : "text-red-600"}>
                ✓ 8 characters
              </span>
              <span className={passwordMeetsCriteria.number ? "text-green-600" : "text-red-600"}>
                ✓ number
              </span>
              <span className={passwordMeetsCriteria.symbol ? "text-green-600" : "text-red-600"}>
                ✓ symbol
              </span>
              <span className={passwordMeetsCriteria.uppercase ? "text-green-600" : "text-red-600"}>
                ✓ uppercase letter
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="col-span-2 ">
            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm pr-10"
                {...register("confirmPassword")}
              />
              <span
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-between sm:flex-row sm:justify-between items-center gap-2">
          <button
            type="button"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded-md flex items-center gap-2 text-sm sm:text-base font-medium"
          >
            <FaArrowLeft /> Back
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium ${
              isValid && !isSubmitting
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Continue →"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;