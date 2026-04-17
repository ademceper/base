import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function Code(
  props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props
  const { code } = kcContext
  const { msg } = i18n

  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (!code.code) return
    try {
      await navigator.clipboard.writeText(code.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={
        code.success
          ? msg("codeSuccessTitle")
          : msg("codeErrorTitle", code.error)
      }
    >
      {code.success ? (
        <div id="kc-code" className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            {msg("copyCodeInstruction")}
          </p>

          <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-muted/40 px-4 py-5">
            <code
              id="code"
              className="block text-center font-mono text-lg tracking-[0.2em] break-all text-foreground select-all"
            >
              {code.code}
            </code>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onCopy}
          >
            {copied ? "Copied" : "Copy code"}
          </Button>
        </div>
      ) : (
        code.error && (
          <Alert variant="destructive" id="error">
            <AlertDescription
              // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via kcSanitize
              dangerouslySetInnerHTML={{
                __html: kcSanitize(code.error),
              }}
            />
          </Alert>
        )
      )}
    </Template>
  )
}
