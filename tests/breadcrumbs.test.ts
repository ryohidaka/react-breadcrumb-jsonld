import { generateBreadcrumbListSchema } from "../src/lib/breadcrumbs";
import { BreadcrumbItem } from "../src/types";

describe("generateBreadcrumbListSchema", () => {
  it("generates a valid Schema.org BreadcrumbList with a deeper hierarchy", () => {
    // Arrange
    const breadcrumbs: BreadcrumbItem[] = [
      { url: "https://example.com/", name: "Home" },
      { url: "https://example.com/product/", name: "Products" },
      { url: "https://example.com/product/hoge", name: "Hoge" },
    ];

    // Act
    const result = generateBreadcrumbListSchema(breadcrumbs);

    // Assert
    expect(result).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@id": "https://example.com/", name: "Home" },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@id": "https://example.com/product/", name: "Products" },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: { "@id": "https://example.com/product/hoge", name: "Hoge" },
        },
      ],
    });
  });

  it("generates an empty BreadcrumbList when given an empty breadcrumbs array", () => {
    // Arrange
    const breadcrumbs: BreadcrumbItem[] = [];

    // Act
    const result = generateBreadcrumbListSchema(breadcrumbs);

    // Assert
    expect(result).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [],
    });
  });
});
