import React from "react";
import Image from "next/image";

function BrandMark({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={40}
            height={40}
            unoptimized
            className="w-full h-full object-contain p-1"
        />
    );
}

/**
 * Official vendor marks from Simple Icons, Wikimedia, and VectorLogoZone.
 * Channel-only items (email / push / webhook) use generic glyphs, not fake brands.
 */
export const integrationIcons = {
    email: (
        <Image src="/integrations/email.svg" alt="Email" width={40} height={40} unoptimized className="w-full h-full object-contain p-1" />
    ),
    sms: <BrandMark src="/integrations/twilio.svg" alt="Twilio SMS" />,
    push: (
        <Image src="/integrations/push.svg" alt="Push notifications" width={40} height={40} unoptimized className="w-full h-full object-contain p-1" />
    ),
    webhook: (
        <Image src="/integrations/webhook.svg" alt="Webhooks" width={40} height={40} unoptimized className="w-full h-full object-contain p-1" />
    ),
    twilio: <BrandMark src="/integrations/twilio.svg" alt="Twilio" />,

    datadog: <BrandMark src="/integrations/datadog.svg" alt="Datadog" />,
    prometheus: <BrandMark src="/integrations/prometheus.svg" alt="Prometheus" />,
    grafana: <BrandMark src="/integrations/grafana.svg" alt="Grafana" />,
    sentry: <BrandMark src="/integrations/sentry.svg" alt="Sentry" />,
    newrelic: <BrandMark src="/integrations/newrelic.svg" alt="New Relic" />,
    dynatrace: <BrandMark src="/integrations/dynatrace.svg" alt="Dynatrace" />,
    appdynamics: <BrandMark src="/integrations/appdynamics.svg" alt="AppDynamics" />,
    honeycomb: <BrandMark src="/integrations/honeycomb.svg" alt="Honeycomb" />,
    splunk: <BrandMark src="/integrations/splunk.svg" alt="Splunk" />,

    cloudwatch: <BrandMark src="/integrations/cloudwatch.svg" alt="AWS CloudWatch" />,
    azure: <BrandMark src="/integrations/azure.svg" alt="Microsoft Azure" />,
    googlecloud: <BrandMark src="/integrations/googlecloud.svg" alt="Google Cloud" />,

    zabbix: <BrandMark src="/integrations/zabbix.svg" alt="Zabbix" />,
    nagios: <BrandMark src="/integrations/nagios.svg" alt="Nagios" />,
    icinga: <BrandMark src="/integrations/icinga.svg" alt="Icinga 2" />,

    github: <BrandMark src="/integrations/github.svg" alt="GitHub" />,
    gitlab: <BrandMark src="/integrations/gitlab.svg" alt="GitLab" />,
    bitbucket: <BrandMark src="/integrations/bitbucket.svg" alt="Bitbucket" />,
    vercel: <BrandMark src="/integrations/vercel.svg" alt="Vercel" />,

    uptimerobot: <BrandMark src="/integrations/uptimerobot.png" alt="UptimeRobot" />,
    pingdom: <BrandMark src="/integrations/pingdom.svg" alt="Pingdom" />,
    betterstack: <BrandMark src="/integrations/betterstack.svg" alt="Better Stack" />,
    uptimekuma: <BrandMark src="/integrations/uptimekuma.svg" alt="Uptime Kuma" />,

    slack: <BrandMark src="/integrations/slack.svg" alt="Slack" />,
    teams: <BrandMark src="/integrations/teams.svg" alt="Microsoft Teams" />,
    msteams: <BrandMark src="/integrations/teams.svg" alt="Microsoft Teams" />,
    jira: <BrandMark src="/integrations/jira.svg" alt="Jira Cloud" />,
    whatsapp: <BrandMark src="/integrations/whatsapp.svg" alt="WhatsApp" />,
    pagerduty: <BrandMark src="/integrations/pagerduty.svg" alt="PagerDuty" />,
    manageengine: <BrandMark src="/integrations/manageengine.svg" alt="ManageEngine" />,
    voice: <BrandMark src="/integrations/twilio.svg" alt="Twilio Voice Paging" />,

    kubernetes: <BrandMark src="/integrations/kubernetes.svg" alt="Kubernetes" />,
    postgres: <BrandMark src="/integrations/postgres.svg" alt="PostgreSQL" />,
};

export type IntegrationKey = keyof typeof integrationIcons;
