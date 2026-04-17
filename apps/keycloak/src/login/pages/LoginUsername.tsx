import { Button } from "@base/ui/components/button"
import { Checkbox } from "@base/ui/components/checkbox"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"
import { Separator } from "@base/ui/components/separator"

import { getKcClsx } from "keycloakify/login/lib/kcClsx"
import { useScript } from "keycloakify/login/pages/LoginUsername.useScript"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import { useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function LoginUsername(
  props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    registrationDisabled,
    messagesPerField,
    enableWebAuthnConditionalUI,
    authenticators,
  } = kcContext

  const { msg, msgStr } = i18n

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)

  const webAuthnButtonId = "authenticateWebAuthnButton"

  useScript({
    webAuthnButtonId,
    kcContext,
    i18n,
  })

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username")}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      infoNode={
        <div id="kc-registration">
          <span>
            {msg("noAccount")}
            <a tabIndex={6} href={url.registrationUrl}>
              {msg("doRegister")}
            </a>
          </span>
        </div>
      }
      headerNode={msg("doLogIn")}
      socialProvidersNode={
        <>
          {realm.password &&
            social?.providers !== undefined &&
            social.providers.length !== 0 && (
              <div
                id="kc-social-providers"
                className={kcClsx("kcFormSocialAccountSectionClass")}
              >
                <Separator />
                <h2>{msg("identity-provider-login-label")}</h2>
                <ul
                  className={kcClsx(
                    "kcFormSocialAccountListClass",
                    social.providers.length > 3 &&
                      "kcFormSocialAccountListGridClass",
                  )}
                >
                  {social.providers.map((...[p, , providers]) => (
                    <li key={p.alias}>
                      <a
                        id={`social-${p.alias}`}
                        className={kcClsx(
                          "kcFormSocialAccountListButtonClass",
                          providers.length > 3 && "kcFormSocialAccountGridItem",
                        )}
                        type="button"
                        href={p.loginUrl}
                      >
                        {p.iconClasses && (
                          <i
                            className={clsx(
                              kcClsx("kcCommonLogoIdP"),
                              p.iconClasses,
                            )}
                            aria-hidden="true"
                          ></i>
                        )}
                        <span
                          className={clsx(
                            kcClsx("kcFormSocialAccountNameClass"),
                            p.iconClasses && "kc-social-icon-text",
                          )}
                        >
                          {p.displayName}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </>
      }
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true)
                return true
              }}
              action={url.loginAction}
              method="post"
            >
              {!usernameHidden && (
                <div className={kcClsx("kcFormGroupClass")}>
                  <Label htmlFor="username">
                    {!realm.loginWithEmailAllowed
                      ? msg("username")
                      : !realm.registrationEmailAsUsername
                        ? msg("usernameOrEmail")
                        : msg("email")}
                  </Label>
                  <Input tabIndex={2}
                    id="username"
                    
                    name="username"
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus
                    autoComplete={
                      enableWebAuthnConditionalUI
                        ? "username webauthn"
                        : "username"
                    }
                    aria-invalid={messagesPerField.existsError("username")} />
                  {messagesPerField.existsError("username") && (
                    <span
                      id="input-error"
                      className={kcClsx("kcInputErrorMessageClass")}
                      aria-live="polite"
                    >
                      {messagesPerField.getFirstError("username")}
                    </span>
                  )}
                </div>
              )}

              <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="checkbox">
                      <Label>
                        <Checkbox tabIndex={3}
                          id="rememberMe"
                          name="rememberMe"
                          
                          defaultChecked={!!login.rememberMe} />{" "}
                        {msg("rememberMe")}
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                <Button type="submit" tabIndex={4} disabled={isLoginButtonDisabled} name="login" id="kc-login">{msgStr("doLogIn")}</Button>
              </div>
            </form>
          )}
        </div>
      </div>
      {enableWebAuthnConditionalUI && (
        <>
          <form id="webauth" action={url.loginAction} method="post">
            <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
            <input
              type="hidden"
              id="authenticatorData"
              name="authenticatorData"
            />
            <input type="hidden" id="signature" name="signature" />
            <input type="hidden" id="credentialId" name="credentialId" />
            <input type="hidden" id="userHandle" name="userHandle" />
            <input type="hidden" id="error" name="error" />
          </form>

          {authenticators !== undefined &&
            authenticators.authenticators.length !== 0 && (
              <>
                <form id="authn_select" className={kcClsx("kcFormClass")}>
                  {authenticators.authenticators.map((authenticator, i) => (
                    <input
                      key={i}
                      type="hidden"
                      name="authn_use_chk"
                      readOnly
                      value={authenticator.credentialId}
                    />
                  ))}
                </form>
              </>
            )}
          <br />

          <Button type="button" id={webAuthnButtonId}>{msgStr("passkey-doAuthenticate")}</Button>
        </>
      )}
    </Template>
  )
}

