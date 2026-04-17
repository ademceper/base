import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

function formatCode(code: string): string {
  const trimmed = code.replace(/\s+/g, "")
  const groupSize = trimmed.length % 3 === 0 ? 3 : 4
  return trimmed.match(new RegExp(`.{1,${groupSize}}`, "g"))?.join(" ") ?? trimmed
}

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
        <div id="kc-code" className="flex flex-col items-center gap-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            {msg("copyCodeInstruction")}
          </p>

          <code
            id="code"
            className="block text-center font-mono text-3xl font-semibold tracking-tight tabular-nums break-all select-all text-foreground"
          >
            {formatCode(code.code ?? "")}
          </code>

          <Button
            type="button"
            variant="default"
            className="w-full"
            onClick={onCopy}
          >
            {copied ? "Copied" : "Copy"}
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
