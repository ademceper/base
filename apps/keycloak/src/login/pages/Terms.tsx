import { Button } from "@base/ui/components/button"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function Terms(
  props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { msg, msgStr } = i18n

  const { url } = kcContext

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={false}
      headerNode={msg("termsTitle")}
    >
      <div id="kc-terms-text">{msg("termsText")}</div>
      <form className="form-actions" action={url.loginAction} method="POST">
        <Button type="submit" name="accept" id="kc-accept">{msgStr("doAccept")}</Button>
        <Button type="submit" name="cancel" id="kc-decline">{msgStr("doDecline")}</Button>
      </form>
      <div className="clearfix" />
    </Template>
  )
}
