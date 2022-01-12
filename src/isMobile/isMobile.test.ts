import { isMobile } from ".";

interface BrowserDetailsTestCase {
    statement: string;
    mockNavigator: any;
    results: any;
}

describe("Util: isMobile", () => {
    const testCases: Array<BrowserDetailsTestCase> = [
        {
            statement: "Should return true when device detected is Android",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36",
            },
            results: true,
        },
        {
            statement: "Should return true when device detected is Smart TV",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.34 Safari/537.36 DMOST/1.0.1 (; LGE; webOSTV; WEBOS4.1.0 04.10.40; W4_lm18a;)",
            },
            results: true,
        },
        {
            statement: "Should return true when device detected is iPhone",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
            },
            results: true,
        },
        {
            statement: "Should return true when device detected is iPad",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1 Edg/90.0.4430.85",
            },
            results: true,
        },
        {
            statement: "Should return true when device detected is iPod",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (iPod touch; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
            },
            results: true,
        },
        {
            statement: "Should return true when device detected is BlackBerry",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-GB) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.342 Mobile Safari/534.11+",
            },
            results: true,
        },
        {
            statement:
                "Should return true when device detected is Window's Phone",
            mockNavigator: {
                userAgent:
                    "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 635) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537",
            },
            results: true,
        },
        {
            statement: "Should return true when device detected is Opera Mini",
            mockNavigator: {
                userAgent:
                    "Opera/9.80 (Android; Opera Mini/12.0.1987/37.7327; U; pl) Presto/2.12.423 Version/12.16",
            },
            results: true,
        },
        {
            statement: "Should return false when user agent is invalid",
            mockNavigator: { userAgent: "" },
            results: false,
        },
    ];

    testCases.map((testCase: BrowserDetailsTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(
            testCase.mockNavigator
        )} | result: ${String(testCase.results)}`, () => {
            (global as any).navigator = Object.create(navigator);
            (global as any).navigator = testCase.mockNavigator;
            expect(isMobile()).toStrictEqual(testCase.results);
        });
    });
});
