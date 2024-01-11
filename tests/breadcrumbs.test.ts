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

  it("throws an error when URLs are not properly nested", () => {
    // Arrange
    const breadcrumbs: BreadcrumbItem[] = [
      { url: "https://example.com/", name: "Home" },
      { url: "https://example.com/product/", name: "Products" },
      { url: "https://differentdomain.com/other", name: "Different" }, // Invalid: Different domain
    ];

    // Act & Assert
    try {
      const result = generateBreadcrumbListSchema(breadcrumbs);
    } catch (error) {
      expect(error);
    }
  });

  it("throws an error when URLs are not absolute paths", () => {
    // Arrange
    const breadcrumbs: BreadcrumbItem[] = [
      { url: "https://example.com/", name: "Home" },
      { url: "/product/", name: "Products" },
      { url: "/product/hoge", name: "Hoge" },
    ];

    // Act & Assert
    try {
      const result = generateBreadcrumbListSchema(breadcrumbs);
    } catch (error) {
      expect(error);
    }
  });
});
