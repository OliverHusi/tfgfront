export const ComentarioCard = ({
    id,
    comentario,
    usuario,
    video
}) => {
    return (
        <div className="col mt-2" style={{width: "95%"}}>
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-8"></div>
                    <div className="card-body">
                        <p className="card-text">{comentario}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}