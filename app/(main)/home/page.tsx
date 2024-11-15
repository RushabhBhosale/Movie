import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div>
      {/* Hero Section with Gradient */}
      <div className="relative bg-[url('/images/hero.jpg')] w-full h-[85vh] bg-cover bg-no-repeat py-20 px-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 w-2/3 bg-gradient-to-r from-black/90 via-black/80 to-transparent"></div>

        <div className="text-primary-foreground max-w-3xl relative z-10 p-6 rounded-lg  shadow-lg">
          <h6 className="text-accent-foreground font-semibold text-lg mb-2">
            #6 Spotlight
          </h6>
          <h2 className="text-primary font-bold text-3xl mb-4">
            The Strongest Magician in the Demon Lord's Army Was a...
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <span className="flex items-center gap-1">
              <i className="icon-tv"></i> TV
            </span>
            <span>•</span>
            <span>24m</span>
            <span>•</span>
            <span>Jul 3, 2024</span>
            <span className="px-2 py-1 bg-accent text-xs rounded-md">HD</span>
            <span className="px-2 py-1 bg-secondary text-xs rounded-md">
              cc 12
            </span>
            <span className="px-2 py-1 bg-muted text-xs rounded-md">12</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Under the tutelage of the great demon warlock Romberg, Ike grew up
            with knowledge regarding an ancient advanced civilization that once
            ruled the land. Coupled with his innate talent in magical arts, this
            upbringing allows Ike to quickly rise in the Demon Lord's army
            ranks, leading his brigade to...
          </p>
          <div className="flex gap-4">
            <Button className="bg-accent text-white px-4 py-2 rounded-md">
              Watch Now
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground border-border px-4 py-2 rounded-md"
            >
              Detail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
