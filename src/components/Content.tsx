import { useMemo } from 'react';
import { CellMeasurer, CellMeasurerCache, CellRenderer, createMasonryCellPositioner, Masonry } from 'react-virtualized'

import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const cache = useMemo(() => {
    return new CellMeasurerCache({
      defaultHeight: 0,
      defaultWidth: 250,
      fixedWidth: true,
    });
  }, [])

  const cellPositioner = useMemo(() => {
    return createMasonryCellPositioner({
      cellMeasurerCache: cache,
      columnCount: 3,
      columnWidth: 250,
      spacer: 50,
    });
  }, [])

  const cellRenderer: CellRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer key={key} index={index} cache={cache} parent={parent}>
        <div style={style}>
          <MovieCard
            key={movies[index].imdbID}
            title={movies[index].Title}
            poster={movies[index].Poster}
            runtime={movies[index].Runtime}
            rating={movies[index].Ratings[0].Value}
          />
        </div>
      </CellMeasurer>
    )
  }

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">

          <Masonry
            cellCount={movies.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={900}
            width={900}
            autoHeight
          />

        </div>
      </main>
    </div>
  )
}