/**
 * Open Banking Gateway - Consent Authorization API.
 * Interface used by the PsuUserAgent to present consent authorization services to the PSU. The consent authorization process is triggered by redirecting the PSU from the [TppBankingApi](https://adorsys.github.io/open-banking-gateway/doc/latest/architecture/dictionary#TppBankingApi) (2<sub>a</sub>) over the [FinTechApi](https://adorsys.github.io/open-banking-gateway/doc/latest/architecture/dictionary#FinTechApi) (2<sub>b</sub>) to the /consent/{auth-id} entry point of this [ConsentAuthorisationApi](https://adorsys.github.io/open-banking-gateway/doc/latest/architecture/dictionary#ConsentAuthorisationApi) (2<sub>c</sub>). The decision on whether the authorization process is embedded or redirected is taken by this ConsentAuthorisationApi.  The following picture displays the overall architecture of this open banking consent authorisation api:   ![High level architecture](/img/open-banking-consent-authorisation-api.png)   #### User Agent This Api assumes that the PsuUserAgent is a modern browsers that : * automatically detects the \"302 Found\" response code and proceeds with the associated location url, * stores httpOnly cookies sent with the redirect under the given domain and path as defined by [RFC 6265](https://tools.ietf.org/html/rfc6265).  This Api also assumes any other PsuUserAgent like a native mobile or a desktop application can simulate this same behavior of amodern browser with respect to 30X and Cookies.    #### Redirecting to the ConsentAuthorisationApi (2<sub>a</sub>) Any service request of the FinTechUI to the FinTechApi (1<sub>a</sub>) will be forwarded to the TppBankingApi (1<sub>b</sub>). This forward might contain a [PsuConsentSession](https://adorsys.github.io/open-banking-gateway/doc/latest/architecture/dictionary#PsuConsentSession) that is used to identify the PSU in the world of the TPP.  The TppBankingApi uses the provided PsuConsentSession to retrieve an eventualy suitable consent that will be used to forward the corresponding service request to the OpenBankingApi (1<sub>c</sub>) of the ASPSP. If there is no suitable consent, the TPP might still send a consent initiation request to the OpenBankingApi (1<sub>c</sub>). Whether this request is sent or not depends on the design of the target OpenBankingApi. Finally, the TppBankingApi will if necessary instruct the FinTechApi (2<sub>a</sub>) to redirect the PsuUgerAgent (2<sub>b</sub>) to the /consent/{auth-id} entry point of  the ConsentAuthorisationApi (2<sub>c</sub>).      #### Issolation Authorisation Request Processing The auth-id parameter is used to make sure paralell authorization requests are not mixup.      #### SessionCookies and XSRF Each authorisation session started will be associated with a proper SessionCookie and a corresponding XSRF-TOKEN. * The request that sets a session cookie (E<sub>1</sub>) also add the X-XSRF-TOKEN to the response header. * The cookie path is always extended with the corresponding auth-id, so two Authorization processes can not share state.  * Each authenticated request sent to the ConsentAuthorisationApi will provide the X-XSRF-TOKEN matching the sent SessionCookie.  #### RedirectCookie and XSRF (R<sub>1</sub>) In a redirect approach (Redirecting PSU to the ASPSP), the The retruned AuthorizeResponse object contains information needed to present a suitable redirect info page to the PSU. Redirection can either be actively performed by the UIApplication or performed as a result of a 30x redirect response to the PsuUserAgent. In both cases, a RedirectCookie will be associated with the  PsuUserAgent and a corresponding XSRF-TOKEN named redirectState will be addedto the back redirect url.      #### Final Result of the Authorization Process The final result of the authorization process is a PsuCosentSession that is returned by the token endpoint of the TppBankingAPi to the FinTechApi (4<sub>c</sub>). This handle will (PsuCosentSession) will be stored by the FinTechApi and added a PSU identifying information to each service request associated with this PSU.  
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PaymentProduct } from './paymentProduct';
import { AccountReference } from './accountReference';
import { SinglePayment } from './singlePayment';
import { PaymentStatus } from './paymentStatus';


export interface BulkPayment { 
    batchBookingPreferred?: boolean;
    debtorAccount?: AccountReference;
    paymentId?: string;
    paymentProduct?: PaymentProduct;
    paymentStatus?: PaymentStatus;
    payments?: Array<SinglePayment>;
    requestedExecutionDate?: string;
}

