import { AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { CheckCircle, Copy, WarningCircle } from "@phosphor-icons/react"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

function formatCode(code: string): string {
  const trimmed = code.replace(/\s+/g, "")
  return trimmed.match(/.{1,4}/g)?.join(" ") ?? trimmed
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
        <div className="flex flex-col items-center gap-1">
          <span className="text-[24px] font-semibold tracking-tight text-foreground/90 leading-tight">
            {code.success
              ? msg("codeSuccessTitle")
              : msg("codeErrorTitle", code.error)}
          </span>
        </div>
      }
    >
      {code.success ? (
        <div id="kc-code" className="flex flex-col items-center space-y-9 py-6">
          <p className="text-center text-[15px] font-medium text-muted-foreground/80">
            {msg("copyCodeInstruction")}
          </p>

          {/* Apple Style Glassmorphic Code Card */}
          <div 
            className="w-full relative group cursor-pointer active:scale-[0.97] transition-all duration-200"
            onClick={onCopy}
          >
            <div className="relative flex flex-col items-center justify-center bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.05] dark:border-white/[0.05] rounded-[24px] p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <code
                id="code"
                className="block text-center font-mono text-4xl font-bold tracking-[0.25em] tabular-nums text-foreground select-all"
              >
                {formatCode(code.code ?? "")}
              </code>
              
              <div className="absolute top-4 right-4 text-muted-foreground/40">
                <Copy size={20} weight="regular" />
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <Button
              type="button"
              onClick={onCopy}
              className={`
                w-full h-[52px] rounded-[14px] text-[16px] font-semibold transition-all duration-300
                ${copied 
                  ? "bg-[#34C759] hover:bg-[#30B753] text-white" 
                  : "bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-sm"}
              `}
            >
              <span className="flex items-center justify-center gap-2">
                {copied ? (
                  <>
                    <CheckCircle size={22} weight="bold" />
                    {"Kopyalandı"}
                  </>
                ) : (
                  <>
                    <Copy size={22} weight="bold" />
                    {"Kodu Kopyala"}
                  </>
                )}
              </span>
            </Button>
            
            <p className="text-[13px] text-muted-foreground/50 text-center leading-relaxed">
              Bu güvenlik kodu tek kullanımlıktır ve <br /> süresi kısa süre içinde dolacaktır.
            </p>
          </div>
        </div>
      ) : (
        code.error && (
          <div className="mt-4 p-4 rounded-[16px] bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-start gap-3">
            <WarningCircle size={20} weight="fill" className="text-[#FF3B30] mt-0.5" />
            <AlertDescription
              className="text-[#FF3B30] text-[14px] font-medium leading-snug"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(code.error),
              }}
            />
          </div>
        )
      )}
    </Template>
  )
}