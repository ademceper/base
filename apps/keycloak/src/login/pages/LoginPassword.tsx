import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"
import { Separator } from "@base/ui/components/separator"

/**
 * Password step (login-password.ftl) for flows where username is already captured.
 * Adds conditional WebAuthn passkey authenticate section when enabled.
 */

import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx"
import { useScript } from "keycloakify/login/pages/LoginPassword.useScript"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import type { JSX } from "keycloakify/tools/JSX"
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed"
import { useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function LoginPassword(
  props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const {
    realm,
    url,
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
      headerNode={msg("doLogIn")}
      displayMessage={!messagesPerField.existsError("password")}
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          <form
            id="kc-form-login"
            onSubmit={() => {
              setIsLoginButtonDisabled(true)
              return true
            }}
            action={url.loginAction}
            method="post"
          >
            <div
              className={clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin")}
            >
              <Separator />
              <Label htmlFor="password">
                {msg("password")}
              </Label>

              <PasswordWrapper
                kcClsx={kcClsx}
                i18n={i18n}
                passwordInputId="password"
              >
                <Input tabIndex={2}
                  id="password"
                  
                  name="password"
                  type="password"
                  autoFocus
                  autoComplete="on"
                  aria-invalid={messagesPerField.existsError(
                    "username",
                    "password",
                  )} />
              </PasswordWrapper>

              {messagesPerField.existsError("password") && (
                <Alert variant="destructive" id="input-error-password" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("password")) }} />
</Alert>
              )}
            </div>
            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
              <div id="kc-form-options">
                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                        {msg("doForgotPassword")}
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
              <Button type="submit" tabIndex={4} name="login" id="kc-login" disabled={isLoginButtonDisabled}>{msgStr("doLogIn")}</Button>
            </div>
          </form>
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

