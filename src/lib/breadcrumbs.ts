import { BreadcrumbList, ListItem, WithContext } from "schema-dts";
import { BreadcrumbItem } from "../types";

/**
 * Generates a Schema.org BreadcrumbList representation from an array of BreadcrumbItem.
 * @param breadcrumbs - An array of BreadcrumbItem containing information about each breadcrumb.
 * @returns A structured data object conforming to the Schema.org BreadcrumbList specification.
 */
export const generateBreadcrumbListSchema = (
  breadcrumbs: BreadcrumbItem[],
): WithContext<BreadcrumbList> => {
  // Convert the array of BreadcrumbItem to an array of ListItem
  const itemListElement = convertBreadcrumbsToStructuredData(breadcrumbs);

  // Return the structured data object representing the BreadcrumbList
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
};

/**
 * Converts an array of BreadcrumbItem to an array of ListItem elements for structured data representation.
 * @param breadcrumbs - An array of BreadcrumbItem containing information about each breadcrumb.
 * @returns An array of ListItem representing each breadcrumb as a structured data element.
 */
const convertBreadcrumbsToStructuredData = (
  breadcrumbs: BreadcrumbItem[],
): ListItem[] => {
  let baseUrl: string | undefined;

  return breadcrumbs.map((item, index) => {
    if (index === 0) baseUrl = item.url;
    else if (baseUrl && !item.url.startsWith(baseUrl)) {
      throw new Error(
        `Invalid breadcrumb at position ${index + 1}: ${
          item.url
        } is not nested under ${baseUrl}`,
      );
    }

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.url,
        name: item.name,
      },
    };
  }) as ListItem[];
};
