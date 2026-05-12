function CampoDeTexto({
    label,
    placeholder,
    texto,
    setTexto,
    isValid,
    errorMessage,
    type = "text",
    children
}) {

    const mostrarErro = texto.length > 0 && !isValid;

    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-black text-[18px] font-medium">
                {label}
            </label>

            <div
                className={`
                    flex items-center rounded-2xl px-4 py-3 w-full bg-white
                    transition-all duration-300

                    ${
                        mostrarErro
                            ? "border-2 border-[#D70040]"
                            : "border border-black shadow-[0px_0px_10px_rgba(0,0,0,0.15)]"
                    }
                `}
            >
                <input
                    className="bg-transparent outline-none text-black w-full placeholder:text-[#999999]"
                    placeholder={placeholder}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    type={type}
                />

                {children}
            </div>

            {mostrarErro && (
                <p className="text-[#D70040] text-sm">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default CampoDeTexto;