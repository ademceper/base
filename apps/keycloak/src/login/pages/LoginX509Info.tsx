import { Button } from "@base/ui/components/button"
import { Label } from "@base/ui/components/label"

import { getKcClsx } from "keycloakify/login/lib/kcClsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function LoginX509Info(
  props: PageProps<Extract<KcContext, { pageId: "login-x509-info.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const { url, x509 } = kcContext

  const { msg, msgStr } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("doLogIn")}
    >
      <form
        id="kc-x509-login-info"
        className={kcClsx("kcFormClass")}
        action={url.loginAction}
        method="post"
      >
        <div className={kcClsx("kcFormGroupClass")}>
          <div className={kcClsx("kcLabelWrapperClass")}>
            <Label htmlFor="certificate_subjectDN">
              {msg("clientCertificate")}
            </Label>
          </div>
          {x509.formData.subjectDN ? (
            <div className={kcClsx("kcLabelWrapperClass")}>
              <Label id="certificate_subjectDN">
                {x509.formData.subjectDN}
              </Label>
            </div>
          ) : (
            <div className={kcClsx("kcLabelWrapperClass")}>
              <Label id="certificate_subjectDN">
                {msg("noCertificate")}
              </Label>
            </div>
          )}
        </div>
        <div className={kcClsx("kcFormGroupClass")}>
          {x509.formData.isUserEnabled && (
            <>
              <div className={kcClsx("kcLabelWrapperClass")}>
                <Label htmlFor="username">
                  {msg("doX509Login")}
                </Label>
              </div>
              <div className={kcClsx("kcLabelWrapperClass")}>
                <Label id="username">
                  {x509.formData.username}
                </Label>
              </div>
            </>
          )}
        </div>
        <div className={kcClsx("kcFormGroupClass")}>
          <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")} />
          </div>
          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <div className={kcClsx("kcFormButtonsWrapperClass")}>
              <Button type="submit" name="login" id="kc-login">{msgStr("doContinue")}</Button>
              {x509.formData.isUserEnabled && (
                <Button type="submit" name="cancel" id="kc-cancel">{msgStr("doIgnore")}</Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </Template>
  )
}

