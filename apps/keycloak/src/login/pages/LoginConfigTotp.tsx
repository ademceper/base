import { Alert, AlertDescription } from "@base/ui/components/alert"
import { Button } from "@base/ui/components/button"
import { Checkbox } from "@base/ui/components/checkbox"
import { Input } from "@base/ui/components/input"
import { Label } from "@base/ui/components/label"


import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

export default function LoginConfigTotp(
  props: PageProps<
    Extract<KcContext, { pageId: "login-config-totp.ftl" }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext

  const { msg, msgStr, advancedMsg } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("loginTotpTitle")}
      displayMessage={!messagesPerField.existsError("totp", "userLabel")}
    >
      <>
        <ol id="kc-totp-settings">
          <li>
            <p>{msg("loginTotpStep1")}</p>

            <ul id="kc-totp-supported-apps">
              {totp.supportedApplications.map((app) => (
                <li key={app}>{advancedMsg(app)}</li>
              ))}
            </ul>
          </li>

          {mode == "manual" ? (
            <>
              <li>
                <p>{msg("loginTotpManualStep2")}</p>
                <p>
                  <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                </p>
                <p>
                  <a href={totp.qrUrl} id="mode-barcode">
                    {msg("loginTotpScanBarcode")}
                  </a>
                </p>
              </li>
              <li>
                <p>{msg("loginTotpManualStep3")}</p>
                <ul>
                  <li id="kc-totp-type">
                    {msg("loginTotpType")}:{" "}
                    {msg(`loginTotp.${totp.policy.type}`)}
                  </li>
                  <li id="kc-totp-algorithm">
                    {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                  </li>
                  <li id="kc-totp-digits">
                    {msg("loginTotpDigits")}: {totp.policy.digits}
                  </li>
                  {totp.policy.type === "totp" ? (
                    <li id="kc-totp-period">
                      {msg("loginTotpInterval")}: {totp.policy.period}
                    </li>
                  ) : (
                    <li id="kc-totp-counter">
                      {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                    </li>
                  )}
                </ul>
              </li>
            </>
          ) : (
            <li>
              <p>{msg("loginTotpStep2")}</p>
              <img
                id="kc-totp-secret-qr-code"
                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                alt="Figure: Barcode"
              />
              <br />
              <p>
                <a href={totp.manualUrl} id="mode-manual">
                  {msg("loginTotpUnableToScan")}
                </a>
              </p>
            </li>
          )}
          <li>
            <p>{msg("loginTotpStep3")}</p>
            <p>{msg("loginTotpStep3DeviceName")}</p>
          </li>
        </ol>

        <form
          action={url.loginAction}
          className={kcClsx("kcFormClass")}
          id="kc-totp-settings-form"
          method="post"
        >
          <div className={kcClsx("kcFormGroupClass")}>
            <div className={kcClsx("kcInputWrapperClass")}>
              <Label htmlFor="totp">
                {msg("authenticatorCode")}
              </Label>{" "}
              <span className="required">*</span>
            </div>
            <div className={kcClsx("kcInputWrapperClass")}>
              <Input type="text"
                id="totp"
                name="totp"
                autoComplete="off"
                
                aria-invalid={messagesPerField.existsError("totp")} />

              {messagesPerField.existsError("totp") && (
                <Alert variant="destructive" id="input-error-otp-code" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("totp")) }} />
</Alert>
              )}
            </div>
            <input
              type="hidden"
              id="totpSecret"
              name="totpSecret"
              value={totp.totpSecret}
            />
            {mode && <input type="hidden" id="mode" value={mode} />}
          </div>

          <div className={kcClsx("kcFormGroupClass")}>
            <div className={kcClsx("kcInputWrapperClass")}>
              <Label htmlFor="userLabel">
                {msg("loginTotpDeviceName")}
              </Label>{" "}
              {totp.otpCredentials.length >= 1 && (
                <span className="required">*</span>
              )}
            </div>
            <div className={kcClsx("kcInputWrapperClass")}>
              <Input type="text"
                id="userLabel"
                name="userLabel"
                autoComplete="off"
                
                aria-invalid={messagesPerField.existsError("userLabel")} />
              {messagesPerField.existsError("userLabel") && (
                <Alert variant="destructive" id="input-error-otp-label" aria-live="polite">
<AlertDescription dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("userLabel")) }} />
</Alert>
              )}
            </div>
          </div>

          <div className={kcClsx("kcFormGroupClass")}>
            <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
          </div>

          {isAppInitiatedAction ? (
            <>
              <Button type="submit" id="saveTOTPBtn">{msgStr("doSubmit")}</Button>
              <Button
                type="submit"
                className={kcClsx(
                  "kcButtonClass",
                  "kcButtonDefaultClass",
                  "kcButtonLargeClass",
                  "kcButtonLargeClass",
                )}
                id="cancelTOTPBtn"
                name="cancel-aia"
                value="true"
              >
                {msg("doCancel")}
              </Button>
            </>
          ) : (
            <Button type="submit" id="saveTOTPBtn">{msgStr("doSubmit")}</Button>
          )}
        </form>
      </>
    </Template>
  )
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
  const { kcClsx, i18n } = props

  const { msg } = i18n

  return (
    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
      <div className={kcClsx("kcFormOptionsWrapperClass")}>
        <div className="checkbox">
          <Label>
            <Checkbox id="logout-sessions"
              name="logout-sessions"
              value="on"
              defaultChecked={true} />
            {msg("logoutOtherSessions")}
          </Label>
        </div>
      </div>
    </div>
  )
}
