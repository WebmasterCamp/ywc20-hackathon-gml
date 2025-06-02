import { FC } from "react";
import { Beer, Sparkles, Users, MapPin } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const BackgroundDecorations: FC = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-0 left-1/4 w-32 h-32 bg-pub-amber/10 rounded-full blur-3xl animate-bubble" />
    <div className="absolute top-10 right-1/3 w-24 h-24 bg-pub-copper/15 rounded-full blur-2xl animate-bubble delay-700" />
    <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-pub-brass/5 rounded-full blur-3xl animate-bubble delay-1000" />
  </div>
);

const FeatureHighlights: FC = () => (
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
    <div className="flex items-center gap-2 text-pub-copper font-medium group">
      <Sparkles className="h-4 w-4 group-hover:animate-spin transition-all duration-300" />
      <span>Top-Rated Pubs</span>
    </div>
    <div className="flex items-center gap-2 text-pub-brass font-medium group">
      <Users className="h-4 w-4 group-hover:animate-bounce transition-all duration-300" />
      <span>Live Chat</span>
    </div>
    <div className="flex items-center gap-2 text-pub-amber font-medium group">
      <MapPin className="h-4 w-4 group-hover:animate-pulse transition-all duration-300" />
      <span>Near You</span>
    </div>
  </div>
);

const DecorativeDivider: FC = () => (
  <div className="mt-8 flex items-center justify-center">
    <div className="h-px bg-gradient-to-r from-transparent via-pub-brass to-transparent w-full max-w-md opacity-50" />
    <div className="mx-4 p-2 bg-pub-amber/10 rounded-full border border-pub-brass/20">
      <Beer className="h-5 w-5 text-pub-brass" />
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-pub-brass to-transparent w-full max-w-md opacity-50" />
  </div>
);

const TitleSection: FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="relative">
      {/* <Beer className="h-8 w-8 sm:h-10 sm:w-10 text-pub-amber animate-pour" /> */}
      {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-pub-foam rounded-full animate-fizz" /> */}
    </div>
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pub-copper via-pub-brass to-pub-gold bg-clip-text text-transparent">
      {title}
    </h1>
    <div className="relative">
      {/* <Beer className="h-8 w-8 sm:h-10 sm:w-10 text-pub-amber animate-pour delay-500" /> */}
      {/* <div className="absolute -top-1 -left-1 w-3 h-3 bg-pub-foam rounded-full animate-fizz delay-300" /> */}
    </div>
  </div>
);

export const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="relative overflow-hidden">
      <BackgroundDecorations />
      
      <div className="relative text-center py-8 sm:py-12">
        <TitleSection title={title} />
        
        {description && (
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        
        {/* <FeatureHighlights /> */}
        {/* <DecorativeDivider /> */}
      </div>
    </div>
  );
};