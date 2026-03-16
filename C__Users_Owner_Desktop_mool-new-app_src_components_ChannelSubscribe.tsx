
'use client';

import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocale } from '@/lib/i18n';

export default function ChannelSubscribe() {
  const { t } = useLocale();
  const channels = [
    {
      name: 'Kahat Kabir Suno..',
      handle: '@nitin-kabir-krishna-nanak-ram-',
      href: 'https://youtube.com/@nitin-kabir-krishna-nanak-ram-?si=rgQPiMYYcJwYy1A5',
      logo: 'https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/bhajan%20kirtan%20and%20news%20section%2Fchannels4_profile%20(1).jpg?alt=media&token=ec3b35bf-2672-4242-b237-d3bb71e7df49',
    },
    {
      name: 'Nitin Das Satsang',
      handle: '@nitin.dasssatsang',
      href: 'https://youtube.com/@nitin.dasssatsang?si=q__XOe7mxCdLciM5',
      logo: 'https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/bhajan%20kirtan%20and%20news%20section%2Fchannels4_profile.jpg?alt=media&token=a8103d94-072b-4bbc-9abc-228e94804456',
    },
  ];

  return (
      <div className="mb-8 p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-bold mb-6 text-center">{t.subscribe_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {channels.map(channel => (
                  <div key={channel.name} className="text-center">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={channel.logo} alt={channel.name} />
                        <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg">{channel.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{channel.handle}</p>
                      <Button asChild className="bg-yellow-500 text-black hover:bg-yellow-600">
                           <a href={channel.href} target="_blank" rel="noopener noreferrer">
                                <Youtube className="mr-2 h-4 w-4" />
                                {t.subscribe_button}
                           </a>
                      </Button>
                  </div>
              ))}
          </div>
      </div>
  )
}
