import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"

import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { getKcClsx } from "keycloakify/login/lib/kcClsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function LoginRecoveryAuthnCodeInput(
  props: PageProps<
    Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext

  const { msg, msgStr } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("auth-recovery-code-header")}
      displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
    >
      <form
        id="kc-recovery-code-login-form"
        className={kcClsx("kcFormClass")}
        action={url.loginAction}
        method="post"
      >
        <div className={kcClsx("kcFormGroupClass")}>
          <div className={kcClsx("kcLabelWrapperClass")}>
            <Label htmlFor="recoveryCodeInput">
              {msg(
                "auth-recovery-code-prompt",
                `${recoveryAuthnCodesInputBean.codeNumber}`,
              )}
            </Label>
          </div>
          <div className={kcClsx("kcInputWrapperClass")}>
            <Input tabIndex={1}
              id="recoveryCodeInput"
              name="recoveryCodeInput"
              aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
              autoComplete="off"
              type="text"
              
              autoFocus />
            {messagesPerField.existsError("recoveryCodeInput") && (
              <Alert variant="destructive" id="input-error" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("recoveryCodeInput")) }} />
</Alert>
            )}
          </div>
        </div>

        <div className={kcClsx("kcFormGroupClass")}>
          <div
            id="kc-form-options"
            className={kcClsx("kcFormOptionsWrapperClass")}
          >
            <div className={kcClsx("kcFormOptionsWrapperClass")} />
          </div>
          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <Button type="submit" name="login" id="kc-login">{msgStr("doLogIn")}</Button>
          </div>
        </div>
      </form>
    </Template>
  )
}

