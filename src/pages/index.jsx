import { useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  )
}

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${episode.id}`}>{episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
                episode.title
              }`}
            >
              <PlayPauseIcon
                playing={player.playing}
                className="h-2.5 w-2.5 fill-current"
              />
              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/${episode.id}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default function Home({ episodes }) {
  return (
    <>
      <Head>
        <title>
          Their Side - Conversations with the most tragically misunderstood
          people of our time
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  // static representation of the feed
  const feed = {
    title: 'Their Side',
    description:
      'Conversations with the most tragically misunderstood people of our time.',
    link: 'undefined',
    image: '',
    category: [],
    items: [
      {
        id: 5,
        title: 'Bill Lumbergh',
        description:
          'He’s going to need you to go ahead and come in on Saturday, but there’s a lot more to the story than you think.',
        link: undefined,
        author: undefined,
        published: 1645660800000,
        created: 1645660800000,
        category: [],
        content:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>What are TPS reports exactly, and what’s the motivation for adding the cover sheet?</li>\n' +
          '<li>How Bill preserves such a cool and calm demeanor, despite the extreme consequences Initech faces for not finishing their Y2K upgrades on time, and why it’s important to protect the staff from that stress</li>\n' +
          '<li>Why suspenders and belts aren’t enough on their own, and should be used together</li>\n' +
          '<li>The backstory behind how Bill purchased his Porsche 911</li>\n' +
          '<li>The real reason he needed the red stapler for himself</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li>Bill Lumbergh’s <a href="#">Twitter profile</a></li>\n' +
          '<li>Bill Lumbergh’s <a href="#">personal website</a></li>\n' +
          '<li>“What’s happening?”, Bill’s new book on effective management <a href="#">on Amazon</a></li>\n' +
          '</ul>\n',
        enclosures: [Array],
        content_encoded:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>What are TPS reports exactly, and what’s the motivation for adding the cover sheet?</li>\n' +
          '<li>How Bill preserves such a cool and calm demeanor, despite the extreme consequences Initech faces for not finishing their Y2K upgrades on time, and why it’s important to protect the staff from that stress</li>\n' +
          '<li>Why suspenders and belts aren’t enough on their own, and should be used together</li>\n' +
          '<li>The backstory behind how Bill purchased his Porsche 911</li>\n' +
          '<li>The real reason he needed the red stapler for himself</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li>Bill Lumbergh’s <a href="#">Twitter profile</a></li>\n' +
          '<li>Bill Lumbergh’s <a href="#">personal website</a></li>\n' +
          '<li>“What’s happening?”, Bill’s new book on effective management <a href="#">on Amazon</a></li>\n' +
          '</ul>\n',
        media: {},
      },
      {
        id: 4,
        title: 'Shooter McGavin',
        description:
          'When golf-obsessed terrorists kidnapped his family and held them hostage in exchange for a Golden Jacket, Shooter had no choice but to win the tour at any cost.',
        link: undefined,
        author: undefined,
        published: 1645056000000,
        created: 1645056000000,
        category: [],
        content:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        enclosures: [Array],
        content_encoded:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        media: {},
      },
      {
        id: 3,
        title: 'The Wet Bandits',
        description:
          'The Christmas of 1989 wasn’t the first time Harry and Marv crossed paths with the McCallisters. The real story starts in 1973, when Peter tripped Marv in the highschool locker room.',
        link: undefined,
        author: undefined,
        published: 1644451200000,
        created: 1644451200000,
        category: [],
        content:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        enclosures: [Array],
        content_encoded:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        media: {},
      },
      {
        id: 2,
        title: 'Hank Scorpio',
        description:
          'What looks to outsiders like a malicious plan to conquer the east coast, was actually a story of liberation and freedom if you get it straight from the source.',
        link: undefined,
        author: undefined,
        published: 1643846400000,
        created: 1643846400000,
        category: [],
        content:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        enclosures: [Array],
        content_encoded:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        media: {},
      },
      {
        id: 1,
        title: 'Skeletor',
        description:
          "You know him as an evil supervillain, but his closest friends call him Jeff, and he's just doing his best to find his way in a world that doesn't know what to do with a talking skeleton.",
        link: undefined,
        author: undefined,
        published: 1643241600000,
        created: 1643241600000,
        category: [],
        content:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        enclosures: [Array],
        content_encoded:
          '<h2 id="topics">Topics</h2>\n' +
          '<ul>\n' +
          '<li>Quibusdam saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>\n' +
          '<li>Praesentium velit ratione</li>\n' +
          '<li>Deserunt ullam sit perspiciatis</li>\n' +
          '<li>Omnis occaecati tempore numquam delectus iste iste odio</li>\n' +
          '<li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>\n' +
          '<li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>\n' +
          '</ul>\n' +
          '<h2 id="sponsors">Sponsors</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Initech</a> — Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>\n' +
          '<li><a href="#">Globex Corporation</a> — Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything you’ve heard about a “doomsday device” is pure conjecture and not based in fact.</li>\n' +
          '</ul>\n' +
          '<h2 id="links">Links</h2>\n' +
          '<ul>\n' +
          '<li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>\n' +
          '<li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>\n' +
          '<li>Eos ratione <a href="#">blanditiis</a></li>\n' +
          '<li>Eius a <a href="#">qui quasi</a></li>\n' +
          '<li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>\n' +
          '</ul>\n',
        media: {},
      },
    ],
  }

  return {
    props: {
      episodes: feed.items.map(
        ({ id, title, description, enclosures, published }) => ({
          id,
          title: `${id}: ${title}`,
          published,
          description,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        })
      ),
    },
    revalidate: 10,
  }
}
