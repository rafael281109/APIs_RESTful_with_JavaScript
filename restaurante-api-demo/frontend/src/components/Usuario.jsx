import { useState, useEffect } from "react";
import Usuario from "./Usuario"; // Importa o componente corretamente
import { getUsuarios } from "../services/api";

function UsuarioApp() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getUsuarios();
        console.log("✅ Usuários recebidos:", response.data);

         console.log("✅ Usuários recebidosssssssss:", response.data.data);

        if (response.data.data) {
          setUsuarios(response.data.data);
        } else {
          setUsuarios(response.data);
        }
      } catch (err) {
        console.error("❌ Erro ao buscar usuários:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleDelete = (id) => {
    console.log("Excluir usuário:", id);
    // aqui depois você pode chamar deleteUsuario(id)
  };

  const handleEdit = (usuario) => {
    console.log("Editar usuário:", usuario);
  };

  if (loading) {
    return (
      <div>
        <h1>Usuários</h1>
        <p>Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Usuários</h1>
        <p>Erro ao carregar usuários.</p>
      </div>
    );
  }

  return (
  <div>
    <h1>📋 Lista de Usuários</h1>

    {usuarios.length === 0 ? (
  <p className="sem-usuarios">Nenhum usuário encontrado.</p>
) : (
  <div className="lista-usuarios">
    {usuarios.map((usuario) => (
      <div className="card-usuario" key={usuario.id}>
        <h2 className="nome-usuario">{usuario.nome}</h2>
        <p className="email-usuario">{usuario.email}</p>
      </div>
    ))}
  </div>
)}
  </div>
);
}

export default UsuarioApp;