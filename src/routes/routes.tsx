import LayoutWrapper from "@/components/layout/wrapper/LayoutWrapper";
import { Home } from "@/pages";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import SearchDetails from "@/pages/SearchDetails";
import Stays from "@/pages/stays/HotelList";
import HotelDetails from "@/pages/stays/HotelDetails";
import Packages from "@/pages/packages/Packages";
import PackageDetailPage from "@/pages/packages/PackageDetailPage";
import { RouteObject } from "react-router-dom";
import CheckoutWrapper from "@/components/layout/CheckoutWrapper/CheckoutWrapper";
import HotelCheckout from "@/components/checkout/HoteCheckout/HotelCheckout";
import LoginForm from "@/components/auth/login/LoginForm";
import ForgetPasswordForm from "@/components/auth/forgotPassword/ForgotPasswordForm";
import SetPassword from "@/components/auth/setPassword/SetPassword";
import VerifyNumber from "@/components/auth/verifyNumber/VerifyNumber";
import RegisterForm from "@/components/auth/register/RegisterForm";
import SetDetailsForm from "@/components/checkout/components/SetDetailsForm";
import Payments from "@/components/checkout/components/Payments";
import BookingConfirmed from "@/pages/BookingConfimed";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import PackageCheckout from "@/components/checkout/PackageCheckout/PackageCheckout";
import RegisterProperty from "@/pages/RegisterProperty";
import CompletePackageBooking from "@/components/SearchDetails/packages/ui/CompletePackageBooking";
import PropertyList from "@/pages/ListYourProperty/PropertyList";
import CompleteListing from "@/pages/ListYourProperty/CompleteListing";
import Header from "@/components/layout/header";
import TopDeals from "@/components/home/Deals/TopDeals";
import HotelDealsList from "@/components/home/Deals/HotelDeals/HotelDealsList";
import MapView from "./MapView";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/list-your-property",
        element: <RegisterProperty />,
      },
    ],
  },
  {
    path: "/map-view",
    element: <MapView />,
  },
  {
    path: "/top-deals",
    element: (
      <div className="flex flex-col gap-10">
        <Header />
        <TopDeals />
      </div>
    ),
  },
  {
    path: "/hotel-deals/:city",
    element: (
      <div className="min-h-screen w-full">
        <Header />
        <main className="w-full px-4">
          <HotelDealsList />
        </main>
      </div>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/search",
    element: <SearchDetails />,
    children: [
      {
        path: "hotel-list",
        element: <Stays />,
      },
      {
        path: `hotel-view/:id`,
        element: <HotelDetails />,
      },
      {
        path: "package-list",
        element: <Packages />,
      },
      {
        path: "package-view/:id",
        element: <PackageDetailPage />,
      },
    ],
  },

  // hotel-view/checkout route
  {
    path: "hotel-view/checkout",
    element: <CheckoutWrapper />,
    children: [
      {
        path: ":id/booking-confirmed",
        element: (
          <ProtectedRoute>
            <BookingConfirmed />
          </ProtectedRoute>
        ),
      },
      {
        path: "",
        element: <HotelCheckout />,
        children: [
          { path: ":id/login/", element: <LoginForm isLogo={false} /> },
          {
            path: ":id/verify",
            element: (
              <ProtectedRoute>
                <VerifyNumber />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/set-details",
            element: (
              <ProtectedRoute>
                <SetDetailsForm />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/pay-with",
            element: (
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/set-password",
            element: (
              <ProtectedRoute>
                <SetPassword />
              </ProtectedRoute>
            ),
          },
          {
            path: "forgot-password",
            element: <ForgetPasswordForm isLogo={false} />,
          },
          { path: "sign-up", element: <RegisterForm isLogo={false} /> },
        ],
      },
    ],
  },

  // New package-view/checkout route
  {
    path: "package-view/checkout",
    element: <CheckoutWrapper />,
    children: [
      {
        path: ":id/package-booking-confirmed",
        element: (
          <ProtectedRoute>
            <CompletePackageBooking />
          </ProtectedRoute>
        ),
      },
      {
        path: "",
        element: <PackageCheckout />,
        children: [
          { path: ":id/login/", element: <LoginForm isLogo={false} /> },
          {
            path: ":id/verify",
            element: (
              <ProtectedRoute>
                <VerifyNumber />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/set-details",
            element: (
              <ProtectedRoute>
                <SetDetailsForm />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/pay-with",
            element: (
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/set-password",
            element: (
              <ProtectedRoute>
                <SetPassword />
              </ProtectedRoute>
            ),
          },
          {
            path: "forgot-password",
            element: <ForgetPasswordForm isLogo={false} />,
          },
          { path: "sign-up", element: <RegisterForm isLogo={false} /> },
        ],
      },
    ],
  },

  {
    path: "/list-your-property/property-list",
    element: <PropertyList />,
  },
  {
    path: "/list-your-property/complete-your-listing",
    element: <CompleteListing />,
  },
];
