import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black fixed inset-0 z-[9999]">
      <div className="relative animate-splash-zoom flex flex-col items-center">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/40 rounded-full blur-3xl animate-splash-glow"></div>
        
        <div className="relative w-[250px] h-[250px] md:w-[320px] md:h-[320px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp_Image_2025-12-30_at_11.37.03_PM-removebg-preview.png?alt=media&token=61622b81-ce46-4fc9-a82e-10f35cf44ff4"
            alt="Mool Gyan Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
