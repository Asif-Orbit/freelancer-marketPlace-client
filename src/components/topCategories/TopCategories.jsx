import { motion } from "framer-motion";

const TopCategories=()=> {
  const items = [
    {
      name: "Web Development",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "UI/UX Design",
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Content Writing",
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Digital Marketing",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Video Editing",
      img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Data Analysis",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-11/12 mx-auto py-12 md:py-16">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Top Categories
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="relative group rounded-xl overflow-hidden shadow hover:shadow-lg border border-base-300 bg-base-100"
          >
            <img
              src={c.img}
              alt={c.name}
              className="h-28 w-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 text-white font-semibold drop-shadow">
              {c.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TopCategories;