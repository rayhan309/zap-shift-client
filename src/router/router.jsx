import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Story from "../Pages/AboutUs/Story/Story";
import Mission from "../Pages/AboutUs/Mission/Mission";
import Success from "../Pages/AboutUs/Success/Success";
import Teams from "../Pages/AboutUs/Teams/Teams";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import PrivitePage from "../AtuhContext/PrivitePage";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashLayout from "../Layouts/DashLayout";
import MyParcels from "../Pages/Dashboards/MyParcels/MyParcels";
import PyAmmount from "../Pages/Dashboards/PyAmmount/PyAmmount";
import PaymentSuccess from "../Pages/Dashboards/PaymentSuccess/PaymentSuccess";
import PaymentHistorys from "../Pages/Dashboards/PaymentHistorys/PaymentHistorys";
import RIdersreq from "../Pages/Dashboards/Ridersreq/RIdersreq";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <p>Loading....</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "sentParcel",
        element: (
          <PrivitePage>
            <SendParcel />
          </PrivitePage>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "aboutUs",
        Component: AboutUs,
        children: [
          {
            index: true,
            Component: Story,
          },
          {
            path: "mission",
            Component: Mission,
          },
          {
            path: "success",
            Component: Success,
          },
          {
            path: "teams",
            Component: Teams,
          },
        ],
      },
      {
        path: "/rider",
        element: (
          <PrivitePage>
            <Rider />
          </PrivitePage>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "dashbords",
    element: (
      <PrivitePage>
        <DashLayout></DashLayout>
      </PrivitePage>
    ),
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'pyParcelAmmount/:id',
        Component: PyAmmount
      },
      {
        path: 'success-full',
        Component: PaymentSuccess
      },
      {
        path: 'payments-history',
        Component: PaymentHistorys
      },
      {
        path: 'riders-request',
        Component: RIdersreq
      }
    ],
  },
]);
