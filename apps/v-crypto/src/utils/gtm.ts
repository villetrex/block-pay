declare global {
  // eslint-disable-next-line
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>;
  }
}

export type PageViewEvent = {
  page_type: string;
  date_time?: string;
  logged_in?: boolean;
  language?: string;
  user_type?: string;
  device_type?: string;
  location_country?: string;
};

export const pushPageView = ({
  variables,
  userId,
  location,
}: {
  variables: PageViewEvent;
  userId: string;
  location: string;
}): void => {
  window.dataLayer.push({
    event: 'virtual_page',
    user_id: userId,
    logged_in: Boolean(userId),
    date_time: new Date().toISOString(),
    location_country: location,
    language: 'en',
    ...variables,
  });
};

export const pushKeyEvent = (variables: {
  source: string;
  medium: string;
  campaign: string;
  page_type: string;
  logged_in: boolean;
  language: string;
  date_time: string;
  user_type: boolean;
  location_country: string | undefined;
  user_id: string;
  event_category: string;
  event_action: string;
  event_label: string;
  event: string;
}): void => {
  window.dataLayer.push(variables);
};
