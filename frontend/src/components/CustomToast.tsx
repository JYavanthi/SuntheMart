import { toast } from "react-hot-toast";
import "../styles/customToast.css";

export const showToast = (
  image: string,
  title: string,
  message: string,
  id?: string
) => {
  toast.custom(
    (t) => (
      <div className={`custom-toast ${t.visible ? "enter" : "leave"}`}>
        <img src={image} className="toast-img" alt="toast" />

        <div className="toast-text">
          <p className="toast-title">{title}</p>
          <p className="toast-message">{message}</p>
        </div>
      </div>
    ),
    {
      id,
      duration: 2000,
    }
  );
};