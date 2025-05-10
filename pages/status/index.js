import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return <div>Carregando...</div>;
  }

  const updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");

  return (
    <div>
      <p>
        <strong>Última atualização:</strong> {updatedAt}
      </p>
      <p>
        <strong>Status do servidor:</strong> {data.status}
      </p>
      <p>
        <strong>Tempo de atividade:</strong> {data.uptime}
      </p>
      <p>
        <strong>Total de requisições:</strong> {data.requests}
      </p>
      <p>
        <strong>Versão:</strong> {data.version}
      </p>
    </div>
  );
}
