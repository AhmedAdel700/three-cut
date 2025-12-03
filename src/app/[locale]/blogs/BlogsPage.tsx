"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import Link from "next/link";
import Image from "next/image";
// import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import img1 from "@/app/assets/img1.png";
import { useLocale } from "next-intl";

// Dummy blog data
const dummyBlogs = [
  {
    id: 1,
    title: "Understanding CNC Cutting: A Beginner's Guide",
    excerpt:
      "Learn the fundamentals of CNC cutting, its applications, and why modern industries rely on it for precision manufacturing.",
    image: img1,
    category: "Manufacturing",
    slug: "cnc-cutting-guide",
  },
  {
    id: 2,
    title: "Top 5 Laser Cutting Techniques for 2025",
    excerpt:
      "Explore the latest advancements in laser cutting and how they are reshaping engineering and fabrication processes.",
    image: img1,
    category: "Laser Cutting",
    slug: "laser-cutting-techniques",
  },
  {
    id: 3,
    title: "How Automated Machines Improve Productivity",
    excerpt:
      "Automation is transforming industries. Here's how automated cutting systems boost efficiency and reduce costs.",
    image: img1,
    category: "Automation",
    slug: "automated-machines-productivity",
  },
  {
    id: 4,
    title: "Choosing the Right Cutting Material",
    excerpt:
      "Not all materials behave the same during cutting. Learn how to choose the best material for your next project.",
    image: img1,
    category: "Materials",
    slug: "choosing-right-material",
  },
  {
    id: 5,
    title: "Advanced Waterjet Cutting Applications",
    excerpt:
      "Waterjet cutting offers unmatched flexibility. Discover industries where it delivers outstanding performance.",
    image: img1,
    category: "Waterjet",
    slug: "waterjet-cutting-applications",
  },
  {
    id: 6,
    title: "Future of Industrial Automation",
    excerpt:
      "A look at how AI, robotics, and automation will transform industrial manufacturing in the next decade.",
    image: img1,
    category: "Industry 4.0",
    slug: "future-industrial-automation",
  },
];

export default function BlogsPage() {
  //   const t = useTranslations("blogs");
  const locale = useLocale();

  return (
    <div className="min-h-screen border-b">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 text-brand-neutral-white relative overflow-hidden section-bg border-b">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl !leading-[1.6] font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
              Our Blogs
            </h1>
            <p className="text-lg lg:text-xl text-brand-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore industry insights, tutorials, and updates on cutting
              technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {dummyBlogs.map((blog, index) => (
              <ScrollReveal key={blog.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 border h-full flex flex-col p-0">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Content */}
                    <CardContent className="px-5 pb-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                        {blog.excerpt}
                      </p>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex gap-2 items-center"
                      >
                        Read More
                        {locale === "en" ? (
                          <ArrowRight className="h-4 w-4 ms-1" />
                        ) : (
                          <ArrowLeft className="h-4 w-4 me-1" />
                        )}
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
