import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'ncs-stripe-in-iconnect');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const paymentServiceCode = `@Service
public class PaymentService {

    public PaymentService(@Value("\${stripe.api-key}") String apiKey) {
        Stripe.apiKey = apiKey;
    }

    public Session createCheckoutSession(
            String successUrl,
            String cancelUrl,
            long amountCents,
            String currency,
            String description) throws StripeException {

        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(successUrl)
            .setCancelUrl(cancelUrl)
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.PAYNOW)
            .addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                    .setCurrency(currency)
                    .setUnitAmount(amountCents)
                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(description)
                        .build())
                    .build())
                .build())
            .build();

        return Session.create(params);
    }
}`;

const controllerCode = `@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/checkout")
    public ResponseEntity<Map<String, String>> createCheckout(
            @RequestBody CheckoutRequest request) throws StripeException {

        Session session = paymentService.createCheckoutSession(
            "https://portal.gov.sg/success",
            "https://portal.gov.sg/cancel",
            request.getAmountCents(),
            "sgd",
            request.getDescription()
        );

        return ResponseEntity.ok(Map.of("url", session.getUrl()));
    }
}`;

const propsCode = `stripe.api-key=\${STRIPE_SECRET_KEY}`;

export default function StripeInIConnect() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#E0F2FE', color: '#0570DE' }}>
        NCS: iConnect Workshop
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Stripe in iConnect</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        A PaymentService bean wrapping Stripe's Java SDK — built once, inherited by every iConnect application.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>The Architecture</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        Spring Boot applications are built in layers: Controllers handle HTTP requests, Services contain business logic, Repositories handle data. A <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>PaymentService</code> is a Spring <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>@Service</code> bean that wraps the Stripe Java SDK. Any application NCS builds on iConnect can autowire this bean and get Stripe payments without rebuilding the integration.
      </p>
      <p className="text-sm mb-6" style={{ color: '#425466' }}>
        The key principle: iConnect's reuse model means NCS builds the PaymentService once. Every government or enterprise project that needs payments inherits it as a dependency — not a per-project integration.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>The PaymentService Bean</h2>
      <CodeBlock language="java" filename="PaymentService.java" code={paymentServiceCode} />

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>Exposing It from a Controller</h2>
      <CodeBlock language="java" filename="PaymentController.java" code={controllerCode} />

      <div className="mt-4 mb-6">
        <CodeBlock language="properties" filename="application.properties" code={propsCode} />
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>PayNow — Essential for Singapore</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        PayNow is already included in the PaymentService above (<code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>addPaymentMethodType(PAYNOW)</code>). When a customer selects PayNow at checkout, Stripe generates a QR code. The customer scans it with their banking app. Stripe confirms via webhook (<code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>payment_intent.succeeded</code>). No additional integration — it's a method on the same Checkout Session.
      </p>

      <div className="grid grid-cols-1 gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { title: 'No additional SDK', desc: 'PayNow is a payment method type, not a separate product' },
          { title: 'QR code generated by Stripe', desc: 'No QR generation code on your side' },
          { title: 'Webhook confirmation', desc: "Listen for payment_intent.succeeded; PayNow is async" },
        ].map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>{title}</p>
            <p className="text-xs" style={{ color: '#425466' }}>{desc}</p>
          </div>
        ))}
      </div>

      <Callout type="tip" title="For government portals">
        Citizens in Singapore expect PayNow as the default payment method. Enabling it takes one line in the PaymentService — it should be included in the base iConnect module from day one.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
