(() => {
  'use strict';

  const cfg = window.VIDRARCH_CONFIG || {};
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];

  const cases = {
    'splunk-platform': {
      kicker: 'CASE FILE // VERIFIED DELIVERY // SIEM PLATFORM',
      title: 'Splunk platform upgrade & production assurance',
      lede: 'A security platform change is not complete when the package installs. The engineering outcome is proven only after service identity, configuration, forwarding, dependent roles, data-plane behavior, and recovery readiness are validated.',
      challenge: 'Upgrade a Linux-based Splunk Enterprise system serving multiple operational roles while preserving telemetry, service continuity, configuration ownership, certificate state, and Splunk Cloud connectivity.',
      approach: [
        'Verified package/product identity before change execution.',
        'Validated package trust using cryptographic integrity/signature checks.',
        'Captured protected configuration, systemd, certificate, runtime, package, and KV Store evidence before change.',
        'Used supported migration and license-acceptance steps rather than forcing service start.',
        'Kept the runtime service account and operational roles intact.'
      ],
      validation: [
        'Confirmed the service was active, enabled, stable, and running under the intended service identity.',
        'Validated Heavy Forwarder communication to Splunk Cloud and Deployment Server phone-home activity.',
        'Confirmed KV Store readiness, listening services, certificate continuity, configuration ownership, and clean post-change logs.',
        'Separated transient warnings from actionable errors instead of treating all log noise as failure.'
      ],
      value: 'Demonstrates security-platform ownership, Linux production operations, dependency awareness, evidence capture, rollback thinking, and the ability to turn a vendor security update into a controlled enterprise change.',
      tech: 'Splunk Enterprise · Splunk Cloud · Linux/RHEL · systemd · KV Store · package verification · deployment server · heavy forwarding',
      disclaimer: 'Public case file intentionally omits hostnames, internal topology, cloud stack identifiers, package hashes, certificate fingerprints, credentials, and organization-specific configuration.'
    },
    'splunk-uf': {
      kicker: 'CASE FILE // VERIFIED METHOD // TELEMETRY RELIABILITY',
      title: 'Universal Forwarder controlled upgrade pattern',
      lede: 'A pilot exposed a production-critical behavior and that lesson was converted into explicit go/no-go criteria for repeatable rollout.',
      challenge: 'Move a Linux Universal Forwarder onto a fixed vendor branch without losing forwarding, changing the service identity, or discovering upgrade prerequisites during the production window.',
      approach: [
        'Established exact product type, version, architecture, installation path, runtime identity, and service state before touching the host.',
        'Used a pilot to validate package behavior and uncover the requirement to accept the updated product license before service start.',
        'Defined stop conditions for wrong package type, wrong architecture, failed integrity checks, insufficient backup, configuration errors, and incorrect service identity.',
        'Captured the process as a reusable runbook rather than treating the pilot as a one-off success.'
      ],
      validation: [
        'Verified product identity and forwarding type after upgrade.',
        'Confirmed active/running service state, zero abnormal restart behavior, and configuration validation.',
        'Checked local logs for recent ERROR/FATAL conditions.',
        'Confirmed current Splunk Cloud connection and fresh internal events.',
        'Validated boot persistence through service enablement.'
      ],
      value: 'Shows how operational lessons become production controls: pilot evidence, explicit decision gates, repeatable validation, and a safer fleet rollout pattern.',
      tech: 'Splunk Universal Forwarder · Linux/RHEL · RPM · systemd · Splunk Cloud · btool · telemetry validation',
      disclaimer: 'Public case file intentionally generalizes host counts, names, internal indexes, deployment paths beyond standard product locations, and organization-specific validation data.'
    },
    endpoint: {
      kicker: 'CASE FILE // ACTIVE ENGINEERING DOMAIN // MICROSOFT SECURITY',
      title: 'Endpoint control engineering',
      lede: 'Treat endpoint security as a managed control system: authoritative policy sources, assignment scope, exclusions, telemetry, supportability, validation, and rollback all matter.',
      challenge: 'Strengthen Windows endpoint controls while minimizing user/business disruption and avoiding broad exceptions that weaken the control.',
      approach: [
        'Work across Microsoft Defender for Endpoint, Defender XDR, Intune, security baselines, Attack Surface Reduction, BitLocker, and Windows Hello.',
        'Use phased rings and pilot groups for material changes instead of broad first-day enforcement.',
        'Validate policy precedence, user-vs-device targeting, assignment filters, telemetry, and licensing/platform support.',
        'Favor narrow exceptions by supported attributes such as signer, certificate, path, process, device, or group when justified.'
      ],
      validation: [
        'Confirm device health and policy application before expansion.',
        'Use Defender telemetry and advanced hunting where appropriate to verify expected behavior and identify unexpected impact.',
        'Document exception rationale, support implications, and rollback steps.',
        'Standardize successful controls into reusable baselines and deployment guidance.'
      ],
      value: 'Demonstrates the difference between enabling a security setting and engineering a control that can survive enterprise production.',
      tech: 'Microsoft Defender XDR · Defender for Endpoint · Intune · ASR · BitLocker · Windows Hello · KQL · Windows security baselines',
      disclaimer: 'This portfolio describes the engineering domain and methods without publishing tenant configuration, enforcement state, user/device groups, exception values, or policy identifiers.'
    },
    identity: {
      kicker: 'CASE FILE // ACTIVE ENGINEERING DOMAIN // IDENTITY',
      title: 'Identity federation & provisioning',
      lede: 'Identity failures often come from small mismatches between service-provider expectations and identity-provider configuration. The engineering task is to map, validate, and prove every side of the trust relationship.',
      challenge: 'Integrate and troubleshoot enterprise applications using modern identity patterns while keeping claims, certificates, user lifecycle, and access-control dependencies aligned.',
      approach: [
        'Work with Microsoft Entra ID enterprise applications, SAML, OpenID Connect/OAuth concepts, SCIM provisioning, app registrations, service principals, and Conditional Access.',
        'Map identifiers, ACS/reply URLs, sign-on behavior, issuer, NameID, claims, attributes, and signing-certificate requirements explicitly.',
        'For provisioning, validate source/target attributes, transformations, scoping, lifecycle behavior, and formatting/truncation risks.',
        'Use sign-in and audit evidence to distinguish identity-provider issues from application-side behavior.'
      ],
      validation: [
        'Confirm successful authentication and expected claim/identifier behavior.',
        'Validate provisioning create/update/deprovision scenarios where applicable.',
        'Check certificate trust and expiration dependencies.',
        'Verify entitlements/application access separately from authentication success.'
      ],
      value: 'Shows cross-system troubleshooting and trust engineering rather than treating SSO as a checkbox in one portal.',
      tech: 'Microsoft Entra ID · SAML · SCIM · OAuth/OIDC · Conditional Access · enterprise applications · claims · certificates',
      disclaimer: 'No tenant IDs, application/client IDs, secrets, internal domains, usernames, role mappings, or production URLs are published.'
    },
    ndr: {
      kicker: 'CASE FILE // ARCHITECTURE / DESIGN // NETWORK DEFENSE',
      title: 'Network detection & visibility architecture',
      lede: 'Network detection design starts with the traffic you can actually observe — not the theoretical link speed printed on a switch port.',
      challenge: 'Design network visibility that can support meaningful NDR telemetry across enterprise traffic without under-sizing sensors, over-retaining packet data, or assuming packet-broker paths are correct.',
      approach: [
        'Scope Security Onion, Zeek, Suricata, sensor/manager roles, distributed deployment, packet capture, metadata, and SIEM integration.',
        'Separate average utilization, peak utilization, packets per second, traffic mix, encryption, monitored interfaces, and retention requirements from raw link capacity.',
        'Validate SPAN/TAP/packet-broker paths, deduplication, clocking, management separation, and failure modes.',
        'Treat north-south, east-west, wireless, server, desktop, virtual, backup, and management traffic as distinct visibility questions.'
      ],
      validation: [
        'Define acceptance tests for Zeek metadata, Suricata detections, packet capture, sensor health, and downstream SIEM telemetry.',
        'Establish capacity and retention monitoring rather than relying on one-time sizing assumptions.',
        'Document sensor placement, packet-path assumptions, and operational escalation.'
      ],
      value: 'Demonstrates architecture thinking grounded in observable traffic, sensor capacity, packet delivery, telemetry quality, and lifecycle operations.',
      tech: 'Security Onion · Zeek · Suricata · TAP/SPAN · packet brokers · NDR · packet capture · SIEM integration',
      disclaimer: 'No airport network diagrams, interface maps, VLANs, IP ranges, device names, or production throughput measurements are published.'
    },
    exposure: {
      kicker: 'CASE FILE // OPERATIONAL EXPERIENCE // EXPOSURE MANAGEMENT',
      title: 'Vulnerability & exposure validation',
      lede: 'A scanner result is an input, not the final risk decision. Security engineering adds applicability, exploitability, exposure context, remediation ownership, and verification.',
      challenge: 'Convert vulnerability data and advisories into defensible action without assuming every scanner finding has the same operational risk.',
      approach: [
        'Perform vulnerability assessments and controlled validation using enterprise vulnerability-management and security-testing tooling.',
        'Confirm affected product/version, exposure path, compensating controls, and authoritative vendor guidance.',
        'Separate patch compliance from compromise assessment when exploitation risk warrants it.',
        'Coordinate remediation with system/application owners and preserve clear evidence of the decision path.'
      ],
      validation: [
        'Re-scan or otherwise verify remediation outcome.',
        'Use endpoint, SIEM, network, or application telemetry when relevant to check for exposure or suspicious behavior.',
        'Document exceptions and residual risk instead of silently suppressing findings.',
        'Close with an evidence record that another engineer or risk owner can understand.'
      ],
      value: 'Demonstrates risk-based prioritization, cross-tool validation, and the discipline to distinguish “patched” from “secure and verified.”',
      tech: 'Nexpose / InsightVM · Metasploit Pro · Microsoft Defender · Splunk · advisory analysis · remediation validation',
      disclaimer: 'No vulnerability evidence, target systems, exploit details tied to real systems, scan results, or incident artifacts are published.'
    }
  };

  function bindConfig() {
    qsa('[data-bind]').forEach(el => {
      const key = el.dataset.bind;
      if (cfg[key]) el.textContent = cfg[key];
    });
    const linkedin = qs('#linkedinLink');
    if (linkedin && cfg.linkedin) linkedin.href = cfg.linkedin;
    const github = qs('#githubLink');
    if (github) {
      if (cfg.github) github.href = cfg.github;
      else github.hidden = true;
    }
    const copyright = qs('#copyright');
    if (copyright) copyright.textContent = `© ${new Date().getFullYear()} ${cfg.callsign || 'VIDRARCH'}`;
  }

  function applyView(mode, updateUrl = true) {
    const recruiter = mode === 'recruiter';
    document.body.classList.toggle('recruiter-mode', recruiter);
    const toggle = qs('#viewToggle');
    const shortcut = qs('#recruiterShortcut');
    if (toggle) {
      toggle.textContent = recruiter ? 'Engineering View' : 'Recruiter View';
      toggle.setAttribute('aria-pressed', recruiter ? 'true' : 'false');
    }
    if (shortcut) shortcut.textContent = recruiter ? 'Return to Engineering View' : 'Switch to Recruiter View';
    document.title = recruiter
      ? `${cfg.realName || 'Ricardo Frontera'} | Security Systems Engineering`
      : `${cfg.callsign || 'VIDRARCH'} // Security Systems Engineering`;

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (recruiter) url.searchParams.set('view', 'recruiter');
      else url.searchParams.delete('view');
      history.replaceState({}, '', url);
    }
    sessionStorage.setItem('vidrarch-view', recruiter ? 'recruiter' : 'engineering');
  }

  function initView() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('view');
    if (requested === 'recruiter') applyView('recruiter', false);
  }

  function initBoot() {
    const boot = qs('#boot');
    if (!boot) return;
    const recruiter = document.body.classList.contains('recruiter-mode');
    const seen = sessionStorage.getItem('vidrarch-booted');
    if (prefersReducedMotion || recruiter || seen) {
      boot.remove();
      return;
    }
    sessionStorage.setItem('vidrarch-booted', '1');
    window.setTimeout(() => boot.classList.add('hidden'), 1650);
    window.setTimeout(() => boot.remove(), 2250);
  }

  function renderCase(caseId) {
    const data = cases[caseId];
    if (!data) return;
    const dialog = qs('#caseDialog');
    const content = qs('#caseDialogContent');
    if (!dialog || !content) return;

    const list = arr => `<ul>${arr.map(i => `<li>${i}</li>`).join('')}</ul>`;
    content.innerHTML = `
      <div class="case-detail-kicker">${data.kicker}</div>
      <h2>${data.title}</h2>
      <p class="case-detail-lede">${data.lede}</p>
      <div class="case-detail-grid">
        <section><h3>Engineering challenge</h3><p>${data.challenge}</p></section>
        <section><h3>Technology / domain</h3><p>${data.tech}</p></section>
        <section><h3>Approach</h3>${list(data.approach)}</section>
        <section><h3>Validation</h3>${list(data.validation)}</section>
        <section style="grid-column:1/-1"><h3>Engineering value</h3><p>${data.value}</p></section>
      </div>
      <p class="case-disclaimer">SANITIZATION NOTE // ${data.disclaimer}</p>
    `;
    dialog.showModal();
  }

  function initCases() {
    qsa('.case-card').forEach(card => {
      const btn = qs('.case-open', card);
      btn?.addEventListener('click', () => renderCase(card.dataset.case));
    });
    const dialog = qs('#caseDialog');
    qs('.dialog-close', dialog)?.addEventListener('click', () => dialog.close());
    dialog?.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });
  }

  function initFabric() {
    qsa('.fabric-node').forEach(node => {
      const jump = () => {
        const target = qs(node.dataset.jump);
        target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
        target?.animate?.([
          { boxShadow: '0 0 0 rgba(127,231,220,0)' },
          { boxShadow: '0 0 0 2px rgba(127,231,220,.5)' },
          { boxShadow: '0 0 0 rgba(127,231,220,0)' }
        ], { duration: 1100, easing: 'ease-out' });
      };
      node.addEventListener('click', jump);
      node.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(); }
      });
    });
  }

  function initRecruiterTools() {
    const toggle = qs('#viewToggle');
    const shortcut = qs('#recruiterShortcut');
    const toggleView = () => applyView(document.body.classList.contains('recruiter-mode') ? 'engineering' : 'recruiter');
    toggle?.addEventListener('click', toggleView);
    shortcut?.addEventListener('click', toggleView);

    qs('#copySummary')?.addEventListener('click', async e => {
      const summary = qs('#recruiterSummary')?.textContent.trim() || '';
      try {
        await navigator.clipboard.writeText(summary);
        const old = e.currentTarget.textContent;
        e.currentTarget.textContent = 'Copied';
        setTimeout(() => e.currentTarget.textContent = old, 1500);
      } catch {
        window.prompt('Copy recruiter summary:', summary);
      }
    });
    qs('#printPortfolio')?.addEventListener('click', () => window.print());
    qs('#emailReveal')?.addEventListener('click', e => {
      const email = `${cfg.emailUser || ''}@${cfg.emailDomain || ''}`;
      if (!cfg.emailUser || !cfg.emailDomain) return;
      const a = document.createElement('a');
      a.className = 'btn btn-ghost';
      a.href = `mailto:${email}`;
      a.textContent = email;
      e.currentTarget.replaceWith(a);
    });
  }

  function initCommandPalette() {
    const dialog = qs('#commandPalette');
    const input = qs('#commandSearch');
    const list = qs('#commandList');
    const open = () => {
      if (!dialog || document.body.classList.contains('recruiter-mode')) return;
      dialog.showModal();
      setTimeout(() => input?.focus(), 30);
    };
    const close = () => dialog?.close();
    qs('#commandButton')?.addEventListener('click', open);
    qs('.command-close', dialog)?.addEventListener('click', close);

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dialog?.open ? close() : open();
      }
    });

    qsa('button', list).forEach(btn => btn.addEventListener('click', () => {
      if (btn.dataset.action === 'toggle-view') {
        close();
        applyView(document.body.classList.contains('recruiter-mode') ? 'engineering' : 'recruiter');
        return;
      }
      const target = qs(btn.dataset.target);
      close();
      target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }));

    input?.addEventListener('input', () => {
      const term = input.value.toLowerCase().trim();
      qsa('button', list).forEach(btn => {
        btn.hidden = term && !btn.textContent.toLowerCase().includes(term);
      });
    });
  }

  function initExternalConfig() {
    if (!cfg.github) qs('#githubLink')?.remove();
    if (!cfg.linkedin) qs('#linkedinLink')?.remove();
  }

  bindConfig();
  initView();
  initBoot();
  initCases();
  initFabric();
  initRecruiterTools();
  initCommandPalette();
  initExternalConfig();
})();
