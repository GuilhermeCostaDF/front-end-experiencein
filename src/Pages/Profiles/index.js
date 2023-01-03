import React, { useEffect, useState } from "react";
import { Header } from "../../Components/Header/Header";
import { api } from "../../Services/api";
import "./Profiles.css";

export default function Profiles() {
  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [message, setMessage] = useState();
  const [invites, setInvites] = useState();
  // const [contacts, setContacts] = useState();

  useEffect(() => {
    //retorna todos os perfis presentes no banco de dados
    api
      .get("/perfis/")
      .then((resp) => setProfiles(resp.data))
      .catch((error) => console.error(error));

    //retorna o usuario logado
    api
      .get("/perfil/")
      .then((resp) => {
        setCurrentProfile(resp.data);
      })
      .catch((error) => console.error(error));

    // retorna todos os convites
    api
      .get("/convites/")
      .then((resp) => {
        const invitesInfo = resp.data.map((invite) => {
          const profile = profiles?.find(
            (profile) => invite.solicitante == profile.id
          );
          return { ...profile, inviteId: invite.id };
        });

        setInvites(invitesInfo);
      })
      .catch((error) => console.error(error));
  }, [profiles]);

  function invite(id) {
    api
      .post(`/convites/convidar/${id}`)
      .then((resp) => setMessage(resp.data.mensagem))
      .catch((error) => console.error(error));
  }

  function accept(id) {
    api
      .post(`/convites/aceitar/${id}`)
      .then((resp) => console.log(resp))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Header nome={currentProfile?.nome} />
      <div className="profiles">
        {/* div criada para mostrar  a mensagem de sucesso no envio do convite */}
        {message ? (
          <div className="mensagem-convite">
            <span>{message} &#128513;&#10024;</span>
          </div>
        ) : null}
        <div className="invite">
          {profiles?.map((profile) =>
            profile.id === currentProfile?.id ||
            !profile.pode_convidar ? null : (
              <div key={profile.id}>
                <div className="card">
                  <h3>{profile.nome}</h3>
                  <span>{profile.email}</span>
                  {profile.pode_convidar ? (
                    <button
                      className="icon"
                      title="Convidar"
                      onClick={() => invite(profile.id)}
                    >
                      Invite
                    </button>
                  ) : null}
                </div>
              </div>
            )
          )}
        </div>
        {/* div para mostrar os convites */}
        <div className="invitations">
          <h2>Invites </h2>
          {invites != 0 ? (
            <>
              {invites?.map((invite) => (
                <div className="invitation-card" key={invite.inviteId}>
                  <h3>{invite.nome}</h3>
                  <button onClick={() => accept(invite.inviteId)}>
                    Confirm
                  </button>
                </div>
              ))}
            </>
          ) : (
            <span>No Invitations yet! &#128546;</span>
          )}
        </div>
      </div>
      {/* div para mostrar os contatos */}
      <div className="contacts">
        <h2>Contacts</h2>
        {currentProfile?.contatos.map((contato) => (
          <div className="invitation-card card-contact" key={contato.id}>
            <h3>{contato.nome}</h3>
            <span>{contato.email}</span>
          </div>
        ))}
      </div>
    </>
  );
}
