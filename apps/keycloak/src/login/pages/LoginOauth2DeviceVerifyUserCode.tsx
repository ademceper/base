import { Button } from "@base/ui/components/button"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"

import { getKcClsx } from "keycloakify/login/lib/kcClsx"
import { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../i18n"
import { KcContext } from "../KcContext"

export default function LoginOauth2DeviceVerifyUserCode(
  props: PageProps<
    Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props
  const { url } = kcContext

  const { msg, msgStr } = i18n

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("oauth2DeviceVerificationTitle")}
    >
      <form
        id="kc-user-verify-device-user-code-form"
        className={kcClsx("kcFormClass")}
        action={url.oauth2DeviceVerificationAction}
        method="post"
      >
        <div className={kcClsx("kcFormGroupClass")}>
          <div className={kcClsx("kcLabelWrapperClass")}>
            <Label htmlFor="device-user-code">
              {msg("verifyOAuth2DeviceUserCode")}
            </Label>
          </div>

          <div className={kcClsx("kcInputWrapperClass")}>
            <Input id="device-user-code"
              name="device_user_code"
              autoComplete="off"
              type="text"
              
              autoFocus />
          </div>
        </div>

        <div className={kcClsx("kcFormGroupClass")}>
          <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
          </div>

          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <div className={kcClsx("kcFormButtonsWrapperClass")}>
              <Button type="submit" >{msgStr("doSubmit")}</Button>
            </div>
          </div>
        </div>
      </form>
    </Template>
  )
}

