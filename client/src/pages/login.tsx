import {useLogin} from "@refinedev/core";
import {useEffect, useRef} from "react";
import {CredentialResponse} from "../interfaces/google";
import {logo} from '../assets';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

export const Login: React.FC = () => {
  const {mutate: login} = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_black",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef}/>;
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        rowGap: '25px',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{
        width: '200px',
        height: '150px',
      }}>
        <img src={logo} alt="logo" style={{width: '100%'}}/>
      </div>

      <GoogleButton/>
    </div>
  );
};
