import React from "react";
import { generateBreadcrumbListSchema } from "@src/lib/breadcrumbs";
import { BreadcrumbSchemaProps } from "@src/types";

/**
 * BreadcrumbSchema component generates structured data in JSON-LD format for breadcrumbs.
 * It takes a `breadcrumbs` prop, which is an array of breadcrumb items, and renders a script tag
 * containing the JSON-LD data for search engine optimization.
 *
 * @component
 * @param {BreadcrumbSchemaProps} props - The properties of the BreadcrumbSchema component.
 * @param {Array} props.breadcrumbs - An array of breadcrumb items to be included in the schema.
 * @returns {JSX.Element} The BreadcrumbSchema component.
 */
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({
  breadcrumbs,
}) => {
  // Generate JSON-LD schema for breadcrumbs
  const json = generateBreadcrumbListSchema(breadcrumbs);

  // Render script tag with JSON-LD data
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};
