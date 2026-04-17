import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { Checkbox } from "@base/ui/components/checkbox"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"
import { Separator } from "@base/ui/components/separator"

/**
 * Combined Username + Password login page (login.ftl) with optional WebAuthn passkey support.
 * Renders standard login form plus conditional passkey authenticator section.
 */

import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx"
import { useScript } from "keycloakify/login/pages/Login.useScript"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import type { JSX } from "keycloakify/tools/JSX"
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed"
import { useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>,
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
    auth,
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
      displayMessage={!messagesPerField.existsError("username", "password")}
      headerNode={msg("loginAccountTitle")}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      infoNode={
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span>
              {msg("noAccount")}{" "}
              <a tabIndex={8} href={url.registrationUrl}>
                {msg("doRegister")}
              </a>
            </span>
          </div>
        </div>
      }
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
                      <Button asChild variant="outline">
                        <a
                          id={`social-${p.alias}`}
                          className={kcClsx(
                            "kcFormSocialAccountListButtonClass",
                            providers.length > 3 &&
                              "kcFormSocialAccountGridItem",
                          )}
                          href={p.loginUrl}
                        >
                          {p.iconClasses && (
                            <i
                              className={clsx(
                                kcClsx("kcCommonLogoIdP"),
                                p.iconClasses,
                              )}
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={clsx(
                              kcClsx("kcFormSocialAccountNameClass"),
                              p.iconClasses && "kc-social-icon-text",
                            )}
                            dangerouslySetInnerHTML={{
                              __html: kcSanitize(p.displayName),
                            }}
                          />
                        </a>
                      </Button>
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
                    aria-invalid={messagesPerField.existsError(
                      "username",
                      "password",
                    )} />
                  {messagesPerField.existsError("username", "password") && (
                    <Alert variant="destructive" id="input-error" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(
                          messagesPerField.getFirstError(
                            "username",
                            "password",
                          ),
                        ) }} />
</Alert>
                  )}
                </div>
              )}

              <div className={kcClsx("kcFormGroupClass")}>
                <Label htmlFor="password">
                  {msg("password")}
                </Label>
                <PasswordWrapper
                  kcClsx={kcClsx}
                  i18n={i18n}
                  passwordInputId="password"
                >
                  <Input tabIndex={3}
                    id="password"
                    
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={messagesPerField.existsError(
                      "username",
                      "password",
                    )} />
                </PasswordWrapper>
                {usernameHidden &&
                  messagesPerField.existsError("username", "password") && (
                    <Alert variant="destructive" id="input-error" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(
                          messagesPerField.getFirstError(
                            "username",
                            "password",
                          ),
                        ) }} />
</Alert>
                  )}
              </div>

              <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="checkbox">
                      <Label>
                        <Checkbox tabIndex={5}
                          id="rememberMe"
                          name="rememberMe"
                          defaultChecked={!!login.rememberMe} />{" "}
                        {msg("rememberMe")}
                      </Label>
                    </div>
                  )}
                </div>
                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                        {msg("doForgotPassword")}
                      </a>
                    </span>
                  )}
                </div>
              </div>

              <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  value={auth.selectedCredential}
                />
                <Button type="submit" tabIndex={7} disabled={isLoginButtonDisabled} name="login" id="kc-login">{msgStr("doLogIn")}</Button>
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

function PasswordWrapper(props: {
  kcClsx: KcClsx
  i18n: I18n
  passwordInputId: string
  children: JSX.Element
}) {
  const { kcClsx, i18n, passwordInputId, children } = props

  const { msgStr } = i18n

  const { isPasswordRevealed, toggleIsPasswordRevealed } =
    useIsPasswordRevealed({ passwordInputId })

  return (
    <div className={kcClsx("kcInputGroup")}>
      {children}
      <Button
        type="button"
        className={kcClsx("kcFormPasswordVisibilityButtonClass")}
        aria-label={msgStr(
          isPasswordRevealed ? "hidePassword" : "showPassword",
        )}
        aria-controls={passwordInputId}
        onClick={toggleIsPasswordRevealed}
      >
        <i
          className={kcClsx(
            isPasswordRevealed
              ? "kcFormPasswordVisibilityIconHide"
              : "kcFormPasswordVisibilityIconShow",
          )}
          aria-hidden
        />
      </Button>
    </div>
  )
}

