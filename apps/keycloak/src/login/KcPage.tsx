import type { ClassKey } from "keycloakify/login"
import DefaultPage from "keycloakify/login/DefaultPage"
import { lazy, Suspense } from "react"
import { useI18n } from "./i18n"
import type { KcContext } from "./KcContext"
import Template from "./Template"

const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"))

const Code = lazy(() => import("./pages/Code"))
const DeleteAccountConfirm = lazy(() => import("./pages/DeleteAccountConfirm"))
const DeleteCredential = lazy(() => import("./pages/DeleteCredential"))
const ErrorPage = lazy(() => import("./pages/Error"))
const FrontchannelLogout = lazy(() => import("./pages/FrontchannelLogout"))
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"))
const Info = lazy(() => import("./pages/Info"))
const LinkIdpAction = lazy(() => import("./pages/LinkIdpAction"))
const Login = lazy(() => import("./pages/Login"))
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"))
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"))
const LoginIdpLinkConfirmOverride = lazy(
  () => import("./pages/LoginIdpLinkConfirmOverride"),
)
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"))
const LoginOauth2DeviceVerifyUserCode = lazy(
  () => import("./pages/LoginOauth2DeviceVerifyUserCode"),
)
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"))
const LoginOtp = lazy(() => import("./pages/LoginOtp"))
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"))
const LoginPasskeysConditionalAuthenticate = lazy(
  () => import("./pages/LoginPasskeysConditionalAuthenticate"),
)
const LoginPassword = lazy(() => import("./pages/LoginPassword"))
const LoginRecoveryAuthnCodeConfig = lazy(
  () => import("./pages/LoginRecoveryAuthnCodeConfig"),
)
const LoginRecoveryAuthnCodeInput = lazy(
  () => import("./pages/LoginRecoveryAuthnCodeInput"),
)
const LoginResetOtp = lazy(() => import("./pages/LoginResetOtp"))
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"))
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"))
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"))
const LoginUsername = lazy(() => import("./pages/LoginUsername"))
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"))
const LoginX509Info = lazy(() => import("./pages/LoginX509Info"))
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"))
const Register = lazy(() => import("./pages/Register"))
const SamlPostForm = lazy(() => import("./pages/SamlPostForm"))
const SelectAuthenticator = lazy(() => import("./pages/SelectAuthenticator"))
const SelectOrganization = lazy(() => import("./pages/SelectOrganization"))
const Terms = lazy(() => import("./pages/Terms"))
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"))
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"))
const WebauthnError = lazy(() => import("./pages/WebauthnError"))
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"))

const doMakeUserConfirmPassword = true

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props
  const { i18n } = useI18n({ kcContext })

  const commonProps = {
    i18n,
    Template,
    doUseDefaultCss: true,
    classes,
  }
  const userProfileProps = {
    ...commonProps,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  }

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "code.ftl":
            return <Code {...commonProps} kcContext={kcContext} />
          case "delete-account-confirm.ftl":
            return (
              <DeleteAccountConfirm {...commonProps} kcContext={kcContext} />
            )
          case "delete-credential.ftl":
            return <DeleteCredential {...commonProps} kcContext={kcContext} />
          case "error.ftl":
            return <ErrorPage {...commonProps} kcContext={kcContext} />
          case "frontchannel-logout.ftl":
            return <FrontchannelLogout {...commonProps} kcContext={kcContext} />
          case "idp-review-user-profile.ftl":
            return (
              <IdpReviewUserProfile
                {...userProfileProps}
                kcContext={kcContext}
              />
            )
          case "info.ftl":
            return <Info {...commonProps} kcContext={kcContext} />
          case "link-idp-action.ftl":
            return <LinkIdpAction {...commonProps} kcContext={kcContext} />
          case "login.ftl":
            return <Login {...commonProps} kcContext={kcContext} />
          case "login-config-totp.ftl":
            return <LoginConfigTotp {...commonProps} kcContext={kcContext} />
          case "login-idp-link-confirm.ftl":
            return (
              <LoginIdpLinkConfirm {...commonProps} kcContext={kcContext} />
            )
          case "login-idp-link-confirm-override.ftl":
            return (
              <LoginIdpLinkConfirmOverride
                {...commonProps}
                kcContext={kcContext}
              />
            )
          case "login-idp-link-email.ftl":
            return <LoginIdpLinkEmail {...commonProps} kcContext={kcContext} />
          case "login-oauth2-device-verify-user-code.ftl":
            return (
              <LoginOauth2DeviceVerifyUserCode
                {...commonProps}
                kcContext={kcContext}
              />
            )
          case "login-oauth-grant.ftl":
            return <LoginOauthGrant {...commonProps} kcContext={kcContext} />
          case "login-otp.ftl":
            return <LoginOtp {...commonProps} kcContext={kcContext} />
          case "login-page-expired.ftl":
            return <LoginPageExpired {...commonProps} kcContext={kcContext} />
          case "login-passkeys-conditional-authenticate.ftl":
            return (
              <LoginPasskeysConditionalAuthenticate
                {...commonProps}
                kcContext={kcContext}
              />
            )
          case "login-password.ftl":
            return <LoginPassword {...commonProps} kcContext={kcContext} />
          case "login-recovery-authn-code-config.ftl":
            return (
              <LoginRecoveryAuthnCodeConfig
                {...commonProps}
                kcContext={kcContext}
              />
            )
          case "login-recovery-authn-code-input.ftl":
            return (
              <LoginRecoveryAuthnCodeInput
                {...commonProps}
                kcContext={kcContext}
              />
            )
          case "login-reset-otp.ftl":
            return <LoginResetOtp {...commonProps} kcContext={kcContext} />
          case "login-reset-password.ftl":
            return <LoginResetPassword {...commonProps} kcContext={kcContext} />
          case "login-update-password.ftl":
            return (
              <LoginUpdatePassword {...commonProps} kcContext={kcContext} />
            )
          case "login-update-profile.ftl":
            return (
              <LoginUpdateProfile {...userProfileProps} kcContext={kcContext} />
            )
          case "login-username.ftl":
            return <LoginUsername {...commonProps} kcContext={kcContext} />
          case "login-verify-email.ftl":
            return <LoginVerifyEmail {...commonProps} kcContext={kcContext} />
          case "login-x509-info.ftl":
            return <LoginX509Info {...commonProps} kcContext={kcContext} />
          case "logout-confirm.ftl":
            return <LogoutConfirm {...commonProps} kcContext={kcContext} />
          case "register.ftl":
            return <Register {...userProfileProps} kcContext={kcContext} />
          case "saml-post-form.ftl":
            return <SamlPostForm {...commonProps} kcContext={kcContext} />
          case "select-authenticator.ftl":
            return (
              <SelectAuthenticator {...commonProps} kcContext={kcContext} />
            )
          case "select-organization.ftl":
            return <SelectOrganization {...commonProps} kcContext={kcContext} />
          case "terms.ftl":
            return <Terms {...commonProps} kcContext={kcContext} />
          case "update-email.ftl":
            return <UpdateEmail {...userProfileProps} kcContext={kcContext} />
          case "webauthn-authenticate.ftl":
            return (
              <WebauthnAuthenticate {...commonProps} kcContext={kcContext} />
            )
          case "webauthn-error.ftl":
            return <WebauthnError {...commonProps} kcContext={kcContext} />
          case "webauthn-register.ftl":
            return <WebauthnRegister {...commonProps} kcContext={kcContext} />
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            )
        }
      })()}
    </Suspense>
  )
}

const classes = {} satisfies { [key in ClassKey]?: string }
