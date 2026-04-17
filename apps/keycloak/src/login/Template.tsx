import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@base/ui/components/dropdown-menu"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { useInitialize } from "keycloakify/login/Template.useInitialize"
import type { TemplateProps } from "keycloakify/login/TemplateProps"
import { useEffect } from "react"
import type { I18n } from "./i18n"
import type { KcContext } from "./KcContext"

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    kcContext,
    i18n,
    doUseDefaultCss,
    children,
  } = props

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n
  const { realm, auth, url, message, isAppInitiatedAction } = kcContext

  useEffect(() => {
    document.title =
      documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name)
  }, [documentTitle, msgStr, realm.displayName, realm.name])

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss })

  if (!isReadyToRender) {
    return null
  }

  const alertVariant: "default" | "destructive" =
    message?.type === "error" ? "destructive" : "default"

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background px-4 py-10 text-foreground antialiased">
      <div className="absolute inset-x-0 top-0 mx-auto flex w-full max-w-sm items-center justify-between px-6 py-4">
        <span className="text-sm font-medium tracking-tight text-muted-foreground">
          {realm.displayName || realm.name}
        </span>
        {enabledLanguages.length > 1 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                id="kc-current-locale-link"
                aria-label={msgStr("languages")}
              >
                {currentLanguage.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              {enabledLanguages.map(({ languageTag, label, href }) => (
                <DropdownMenuItem key={languageTag} asChild>
                  <a href={href}>{label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <main className="w-full max-w-sm space-y-6">
        <header className="space-y-1">
          {auth?.showUsername && !auth.showResetCredentials ? (
            <div className="flex items-center justify-between">
              <div id="kc-attempted-username" className="text-sm font-medium">
                {auth.attemptedUsername}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a
                  id="reset-login"
                  href={url.loginRestartFlowUrl}
                  aria-label={msgStr("restartLoginTooltip")}
                >
                  {msg("restartLoginTooltip")}
                </a>
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-xl font-semibold tracking-tight">
              {headerNode}
            </h1>
          )}

          {displayRequiredFields && (
            <p className="text-center text-xs text-muted-foreground">
              <span className="text-destructive">*</span>{" "}
              {msg("requiredFields")}
            </p>
          )}
        </header>

        {displayMessage &&
          message !== undefined &&
          (message.type !== "warning" || !isAppInitiatedAction) && (
            <Alert variant={alertVariant}>
              <AlertDescription
                // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via kcSanitize
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(message.summary),
                }}
              />
            </Alert>
          )}

        <div className="space-y-4">{children}</div>

        {auth?.showTryAnotherWayLink && (
          <form
            id="kc-select-try-another-way-form"
            action={url.loginAction}
            method="post"
          >
            <input type="hidden" name="tryAnotherWay" value="on" />
            <Button
              type="submit"
              variant="link"
              size="sm"
              id="try-another-way"
              className="w-full"
            >
              {msg("doTryAnotherWay")}
            </Button>
          </form>
        )}

        {socialProvidersNode}

        {displayInfo && (
          <div
            id="kc-info-wrapper"
            className="pt-2 text-center text-sm text-muted-foreground"
          >
            {infoNode}
          </div>
        )}
      </main>
    </div>
  )
}
