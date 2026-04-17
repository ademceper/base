import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"

import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { getKcClsx } from "keycloakify/login/lib/kcClsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const { url, realm, auth, messagesPerField } = kcContext

  const { msg, msgStr } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayInfo
      displayMessage={!messagesPerField.existsError("username")}
      infoNode={
        realm.duplicateEmailsAllowed
          ? msg("emailInstructionUsername")
          : msg("emailInstruction")
      }
      headerNode={msg("emailForgotTitle")}
    >
      <form
        id="kc-reset-password-form"
        className={kcClsx("kcFormClass")}
        action={url.loginAction}
        method="post"
      >
        <div className={kcClsx("kcFormGroupClass")}>
          <div className={kcClsx("kcLabelWrapperClass")}>
            <Label htmlFor="username">
              {!realm.loginWithEmailAllowed
                ? msg("username")
                : !realm.registrationEmailAsUsername
                  ? msg("usernameOrEmail")
                  : msg("email")}
            </Label>
          </div>
          <div className={kcClsx("kcInputWrapperClass")}>
            <Input type="text"
              id="username"
              name="username"
              
              autoFocus
              defaultValue={auth.attemptedUsername ?? ""}
              aria-invalid={messagesPerField.existsError("username")} />
            {messagesPerField.existsError("username") && (
              <Alert variant="destructive" id="input-error-username" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("username")) }} />
</Alert>
            )}
          </div>
        </div>
        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
          <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div>

          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <Button type="submit" >{msgStr("doSubmit")}</Button>
          </div>
        </div>
      </form>
    </Template>
  )
}

