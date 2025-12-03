"use client";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import img1 from "@/app/assets/img1.png";
import { useLocale } from "next-intl";

// Dummy blog data (in real app, this would come from props or API)
const blogPost = {
  title: "Understanding CNC Cutting: A Beginner's Guide",
  image: img1,
  date: "December 1, 2025",
  description: `
    CNC (Computer Numerical Control) cutting is a manufacturing process that uses pre-programmed computer software to control the movement of factory tools and machinery. This technology has revolutionized the manufacturing industry by providing unprecedented precision and efficiency.

    CNC cutting offers numerous advantages over traditional manufacturing methods. It provides precision with tolerances as tight as 0.001 inches, ensuring consistent quality across all products. The automated processes reduce production time and minimize material waste, while the repeatability allows machines to produce identical parts thousands of times. CNC technology can also create intricate designs that would be impossible with manual methods.

    There are several types of CNC cutting methods, each suited for different materials and applications. Laser cutting uses a high-powered laser beam to cut through materials with extreme precision, ideal for metals, plastics, and wood. Plasma cutting is perfect for cutting through electrically conductive materials like steel, aluminum, and copper, and is faster than laser cutting for thicker materials. Waterjet cutting uses a high-pressure stream of water mixed with abrasive particles, excellent for materials that are sensitive to high temperatures.

    CNC cutting technology is used across various industries including aerospace for creating precision components, automotive for manufacturing engine parts and body panels, medical for producing surgical instruments and implants, and electronics for cutting circuit boards and components.

    If you're interested in incorporating CNC cutting into your manufacturing process, start by assessing your needs and determining which type of CNC cutting is right for your application. Research and select appropriate CNC equipment, invest in training for your operators, start with simple projects and gradually increase complexity, and regularly maintain your equipment for optimal performance.

    CNC cutting technology continues to evolve, offering manufacturers greater precision, efficiency, and flexibility. Whether you're just starting out or looking to upgrade your existing operations, understanding the fundamentals of CNC cutting is essential for staying competitive in today's manufacturing landscape.
  `,
};

export default function BlogDetails() {
  const locale = useLocale();
  return (
    <div className="min-h-screen pt-20 pb-10 !section-bg">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {locale === "en" ? (
          <Link href="/blogs" className="flex gap-2 items-center">
            <ArrowLeft className="h-4 w-4 me-2" />
            Back to Blogs
          </Link>
        ) : (
          <Link href="/blogs" className="flex gap-2 items-center">
            <ArrowRight className="h-4 w-4 me-2" />
            Back to Blogs
          </Link>
        )}

        <article>
          {/* Image */}
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {blogPost.title}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground mb-8">
            <Calendar className="h-4 w-4" />
            <span>{blogPost.date}</span>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            {blogPost.description.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground leading-relaxed mb-6"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
