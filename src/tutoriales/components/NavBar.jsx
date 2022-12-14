import { useAuthStore } from "../../hooks/useAuthStore"
import { Link } from "react-router-dom";
import { useVideoStore } from "../../hooks/useVideoStore";

export const NavBar = () => {

    const { startLogout, user } = useAuthStore();
    const { startLoadingVideosUser } = useVideoStore();

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <Link to={`/user`}>
                    <button onClick={startLoadingVideosUser}>
                        <i className="fa-solid fa-user">
                        </i>
                    </button>
                </Link>
                &nbsp;
                {user.nombre}
            </span>

            <button className="btn btn-outline-danger" onClick={startLogout}>
                <i className="fas fa-sing-out-alt"></i>
                <span>Salir</span>
            </button>
        </div>
    )
}