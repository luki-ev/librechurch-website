<?php declare(strict_types=1);

const CACHE_FILE = __DIR__ . '/toots-cache.html';
const CACHE_TTL_SECONDS = 30 * 60;
const TOOTS_RSS_URL = 'https://kirche.social/@librechurch.rss';
const NUMBER_OF_TOOTS = 3;

class MastodonRssParser
{
    public static function parseItems(string $rss, int $limit = null): array
    {
        if (null === $limit) {
            $limit = PHP_INT_MAX;
        }

        $rssXml = new \SimpleXMLElement($rss);

        $items = [];
        $itemsCount = 0;
        foreach ($rssXml->channel->item as $item) {
            $items[] = [
                'title' => (string) $item->title,
                'guid' => (string) $item->guid,
                'link' => (string) $item->link,
                'pubDate' => (string) $item->pubDate,
                'description' => html_entity_decode((string) $item->description),
            ];
            $itemsCount++;

            if ($itemsCount >= $limit) {
                break;
            }
        }

        return $items;
    }

    public static function parseItemsFromUrl(string $url, int $limit = null): array
    {
        return static::parseItems(file_get_contents($url), $limit);
    }
}

function createItemsHtml(): string
{
    $html = '';
    foreach (MastodonRssParser::parseItemsFromUrl(TOOTS_RSS_URL, NUMBER_OF_TOOTS) as $item) {
        $pubDate = date('d.m.Y H:i:s', strtotime($item['pubDate']));
        $description = $item['description'];
        $html .= <<<EOD
            <div class="step__text">
                <strong>$pubDate</strong>
                $description
            </div>

EOD;
    }

    return $html;
}

if (!is_file(CACHE_FILE) || time() - filemtime(CACHE_FILE) > CACHE_TTL_SECONDS) {
    try {
        $html = createItemsHtml();
        file_put_contents(CACHE_FILE, $html);
    } catch (\Exception $e) {
        // ignore for now...
    }
}

if (is_file(CACHE_FILE)) {
    echo file_get_contents(CACHE_FILE);
}
