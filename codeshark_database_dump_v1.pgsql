--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Ubuntu 14.0-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.0 (Ubuntu 14.0-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: jeosvojio; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.jeosvojio (
    korisnikid integer NOT NULL,
    trofejid integer NOT NULL
);


ALTER TABLE public.jeosvojio OWNER TO codeshark_user;

--
-- Name: klasanatjecanja; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.klasanatjecanja (
    nazivklasenatjecanja character varying NOT NULL,
    idklasenatjecanja integer NOT NULL
);


ALTER TABLE public.klasanatjecanja OWNER TO codeshark_user;

--
-- Name: korisnik; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.korisnik (
    korisnikid integer NOT NULL,
    korisnickoime character varying NOT NULL,
    lozinka character varying NOT NULL,
    slikaprofila character varying NOT NULL,
    ime character varying NOT NULL,
    prezime character varying NOT NULL,
    email character varying NOT NULL,
    titula character varying,
    nivouprava integer NOT NULL,
    token character varying(32),
    tokengeneriran timestamp without time zone,
    aktivan boolean DEFAULT false NOT NULL,
    CONSTRAINT chkmogucerazineprava CHECK (((nivouprava >= 1) AND (nivouprava <= 3)))
);


ALTER TABLE public.korisnik OWNER TO codeshark_user;

--
-- Name: korisnik_korisnikid_seq; Type: SEQUENCE; Schema: public; Owner: codeshark_user
--

CREATE SEQUENCE public.korisnik_korisnikid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.korisnik_korisnikid_seq OWNER TO codeshark_user;

--
-- Name: korisnik_korisnikid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codeshark_user
--

ALTER SEQUENCE public.korisnik_korisnikid_seq OWNED BY public.korisnik.korisnikid;


--
-- Name: natjecanje; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.natjecanje (
    natjecanjeid integer NOT NULL,
    imenatjecanja character varying NOT NULL,
    tekstnatjecanja character varying NOT NULL,
    vrijemekraj timestamp without time zone NOT NULL,
    vrijemepoc timestamp without time zone NOT NULL,
    slikatrofeja character varying NOT NULL,
    brojzadataka integer NOT NULL,
    autorid integer NOT NULL,
    idklasenatjecanja integer NOT NULL,
    trofejid integer NOT NULL,
    slug character varying,
    CONSTRAINT chkmogucbrojzadataka CHECK (((brojzadataka >= 1) AND (brojzadataka <= 10))),
    CONSTRAINT trajanjenatjecanja CHECK (((vrijemekraj >= vrijemepoc) AND (vrijemekraj <= (vrijemepoc + '2 days'::interval))))
);


ALTER TABLE public.natjecanje OWNER TO codeshark_user;

--
-- Name: natjecanje_natjecanjeid_seq; Type: SEQUENCE; Schema: public; Owner: codeshark_user
--

CREATE SEQUENCE public.natjecanje_natjecanjeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.natjecanje_natjecanjeid_seq OWNER TO codeshark_user;

--
-- Name: natjecanje_natjecanjeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codeshark_user
--

ALTER SEQUENCE public.natjecanje_natjecanjeid_seq OWNED BY public.natjecanje.natjecanjeid;


--
-- Name: sesija; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.sesija (
    sesijaid character varying NOT NULL,
    pocetaksesije timestamp without time zone NOT NULL,
    korisnikid integer NOT NULL
);


ALTER TABLE public.sesija OWNER TO codeshark_user;

--
-- Name: sudjelujena; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.sudjelujena (
    korisnikid integer NOT NULL,
    natjecanjeid integer NOT NULL
);


ALTER TABLE public.sudjelujena OWNER TO codeshark_user;

--
-- Name: testprimjer; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.testprimjer (
    ulaz character varying NOT NULL,
    izlaz character varying NOT NULL,
    zadatakid integer NOT NULL
);


ALTER TABLE public.testprimjer OWNER TO codeshark_user;

--
-- Name: trofej; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.trofej (
    trofejid integer NOT NULL,
    imetrofeja character varying NOT NULL,
    slikatrofeja character varying NOT NULL
);


ALTER TABLE public.trofej OWNER TO codeshark_user;

--
-- Name: trofej_trofejid_seq; Type: SEQUENCE; Schema: public; Owner: codeshark_user
--

CREATE SEQUENCE public.trofej_trofejid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trofej_trofejid_seq OWNER TO codeshark_user;

--
-- Name: trofej_trofejid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codeshark_user
--

ALTER SEQUENCE public.trofej_trofejid_seq OWNED BY public.trofej.trofejid;


--
-- Name: uploadrjesenja; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.uploadrjesenja (
    predanorjesenje character varying NOT NULL,
    prolaznost numeric NOT NULL,
    vrijemepredaje timestamp without time zone NOT NULL,
    prosjvrijemeizvrs numeric NOT NULL,
    korisnikid integer NOT NULL,
    zadatakid integer NOT NULL
);


ALTER TABLE public.uploadrjesenja OWNER TO codeshark_user;

--
-- Name: virtnatjecanje; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.virtnatjecanje (
    virtnatjecanjeid integer NOT NULL,
    vrijemekreacije timestamp without time zone NOT NULL,
    korisnikid integer NOT NULL,
    natjecanjeid integer,
    zadaci integer[],
    CONSTRAINT randomxilinatjecanje CHECK ((((natjecanjeid IS NOT NULL) AND (zadaci IS NULL)) OR ((zadaci IS NOT NULL) AND (natjecanjeid IS NULL))))
);


ALTER TABLE public.virtnatjecanje OWNER TO codeshark_user;

--
-- Name: virtnatjecanje_virtnatjecanjeid_seq; Type: SEQUENCE; Schema: public; Owner: codeshark_user
--

CREATE SEQUENCE public.virtnatjecanje_virtnatjecanjeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.virtnatjecanje_virtnatjecanjeid_seq OWNER TO codeshark_user;

--
-- Name: virtnatjecanje_virtnatjecanjeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codeshark_user
--

ALTER SEQUENCE public.virtnatjecanje_virtnatjecanjeid_seq OWNED BY public.virtnatjecanje.virtnatjecanjeid;


--
-- Name: zadatak; Type: TABLE; Schema: public; Owner: codeshark_user
--

CREATE TABLE public.zadatak (
    zadatakid integer NOT NULL,
    imezadatka character varying NOT NULL,
    bodovi integer NOT NULL,
    maxvrijemeizvrs numeric NOT NULL,
    tekstzadatka character varying NOT NULL,
    privatnost boolean NOT NULL,
    slug character varying NOT NULL,
    autorid integer NOT NULL,
    natjecanjeid integer,
    CONSTRAINT chkmogucerazinebodova CHECK (((bodovi >= 1) AND (bodovi <= 5)))
);


ALTER TABLE public.zadatak OWNER TO codeshark_user;

--
-- Name: zadatak_zadatakid_seq; Type: SEQUENCE; Schema: public; Owner: codeshark_user
--

CREATE SEQUENCE public.zadatak_zadatakid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zadatak_zadatakid_seq OWNER TO codeshark_user;

--
-- Name: zadatak_zadatakid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codeshark_user
--

ALTER SEQUENCE public.zadatak_zadatakid_seq OWNED BY public.zadatak.zadatakid;


--
-- Name: korisnik korisnikid; Type: DEFAULT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.korisnik ALTER COLUMN korisnikid SET DEFAULT nextval('public.korisnik_korisnikid_seq'::regclass);


--
-- Name: natjecanje natjecanjeid; Type: DEFAULT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje ALTER COLUMN natjecanjeid SET DEFAULT nextval('public.natjecanje_natjecanjeid_seq'::regclass);


--
-- Name: trofej trofejid; Type: DEFAULT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.trofej ALTER COLUMN trofejid SET DEFAULT nextval('public.trofej_trofejid_seq'::regclass);


--
-- Name: virtnatjecanje virtnatjecanjeid; Type: DEFAULT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.virtnatjecanje ALTER COLUMN virtnatjecanjeid SET DEFAULT nextval('public.virtnatjecanje_virtnatjecanjeid_seq'::regclass);


--
-- Name: zadatak zadatakid; Type: DEFAULT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.zadatak ALTER COLUMN zadatakid SET DEFAULT nextval('public.zadatak_zadatakid_seq'::regclass);


--
-- Data for Name: jeosvojio; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.jeosvojio (korisnikid, trofejid) FROM stdin;
70	1
70	2
50	1
84	1
74	73
55	73
\.


--
-- Data for Name: klasanatjecanja; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.klasanatjecanja (nazivklasenatjecanja, idklasenatjecanja) FROM stdin;
amater	1
professional	2
\.


--
-- Data for Name: korisnik; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.korisnik (korisnikid, korisnickoime, lozinka, slikaprofila, ime, prezime, email, titula, nivouprava, token, tokengeneriran, aktivan) FROM stdin;
80	test.testic4	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_86ec14b1bf679049a71cef4b572fb984.jpg	Test	Testić	rab69658@qopow.com	amater	1	\N	\N	t
84	test.testic8	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_13958d887d929efbb2e952d3f490d4ce.jpg	Test	Testić	muj16597@zwoho.com	amater	1	\N	\N	t
74	nut.ella	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_4dbd00689850c0353d54293e1444fd66.png	Ella	nisi vise htjela he he	nut.ella@fer.hr	amater	1	\N	\N	t
62	Ajvar	084f48826f26b34061dc24ae7e9b729eec3ba81a05ca40f424822f2ac9f5e22f	pfp_d41d8cd98f00b204e9800998ecf8427e.png	Var	Aj	ajvar@fer.hr	amater	3	\N	\N	t
60	Hrvoje Nuić	5ac152b6f8bdb8bb12959548d542cb237c4a730064bf88bbb8dd6e204912baad	pfp_fc0367dc1e8f230d4c5d0b7b24e0c282.png	Hrvoje	Nuić	Hrvoje.Nuic@fer.hr	amater	3	\N	\N	t
70	varko.ajvarko	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_30eff24f02c6867587be835059e2557e.png	Varko	Ajvarko	varko.ajvarko@fer.hr	amater	2	\N	\N	t
49	pero.perica	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_b0177b5abff239a2290a96ec13510eab.jpg	Pero	Perica	pero.perica@fer.hr	amater	1	\N	\N	t
33	var.ajvar1	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	juan.png	Var	Ajvar	var.ajvar1@fer.hr	amater	3	\N	\N	t
72	test	9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08	pfp_06467135cf40942140060416047e4548.png	test	test	test@example.com	amater	1	\N	\N	t
88	test.testic12	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_32e089c18c7ea9bfb4553db8f8db91c9.jpg	Test2	Testić	rdq62766@boofx.com	amater	1	\N	\N	t
50	pero.perica1	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_c76bea6f9cd993e4d1c3c6b1f7e3997a.png	pero	perica	pero.perica1@fer.hr	amater	2	\N	\N	t
52	perica.mjerica	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_b788b6b82a1079bfdc455118af490a0a.svg	Perica	Mjerica	perica.mjerica@efzg.hr	amater	1	\N	\N	t
57	AlphaMale	8ed3f6ad685b959ead7022518e1af76cd816f8e8ec7ccdda1ed4018e8f2223f8	pfp_c1aaad194115795eae73b5408159c6ef.jpg	Alpha	Male	alphamale@fer.hr	amater	2	\N	\N	t
55	obicansmrtnik2	485dee55111a71f8f5c155594ffe3e63b9444d2e3f19b4d55630401225a34639	pfp_0bd9ff5926c805a04b90e086f3dd1df6.jpg	obican	smrtnik	obicansmrtnik@mef.hr	amater	1	\N	\N	t
54	obicansmrtnik1	485dee55111a71f8f5c155594ffe3e63b9444d2e3f19b4d55630401225a34639	pfp_df8da66539f7aa7f7c7f729574dcd021.jpg	neobicanasdasd	bruh	neobicanbesmrtnik@ffzg.hr	amater	2	\N	\N	t
56	obicansmrtnik3	485dee55111a71f8f5c155594ffe3e63b9444d2e3f19b4d55630401225a34639	pfp_1c6f2ca987d44ab67ba93e9c70b3e8b8.jpg	obican	smrtnik	obicansmrtnik@fsb.hr	amater	1	\N	\N	t
61	Fran Kukec	33eb3bc86dc2f788a000cb947567fa83f6092406c2491f503cfae7de33c90b67	pfp_a670ae2a25f2b6c0522615b41266a413.png	Fran	Kukec	fran.kukec@fer.hr	amater	3	\N	\N	t
59	OmegaMale	304b4a90a76a1cbe4c112e074b30e75181f54df43d60f883597457844293b341	pfp_3acd6fab9d181f6f8a1d51a459b113ce.jpg	Omega	Male	omegamale@fer.hr	amater	2	\N	\N	t
67	aaa	9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0	pfp_47bce5c74f589f4867dbd57e9ca9f808.None	aaa	aaa	aaa@a	amater	1	\N	\N	t
87	test.testic11	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_e606715773d890a302e413be72f97a37.jpg	Test	Testić	rdq62768@boofx.com	amater	1	\N	\N	t
89	test.testic13	8628edb69671fa39e5241f7fe28eec30b5394f996740826b809e5b004aa99a75	pfp_d4bf3a8c9ba78c5dcb386852c6bcad5c.jpg	Test	Testić	rdq6271236@boofx.com	amater	1	\N	\N	t
58	SigmaMale	38de90475bb334fb3dea5d54f250500aba60fe2c6158115d342b06bcb46e39bf	pfp_b8caa6ac36055f63ecf57594edc7e921.jpg	Sigma	Male	sigmamale@fer.hr	amater	2	\N	\N	t
51	asdf22	1a41ec3715fb24a88f041948774791ba2e3be9f798084c1818d9c1044c6377e6	pfp_2472db69a8b720f8f9561f60ee9dd0ec.jpg	asdf223	asdf22	asdf22@example.com	amater	1	\N	\N	t
\.


--
-- Data for Name: natjecanje; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.natjecanje (natjecanjeid, imenatjecanja, tekstnatjecanja, vrijemekraj, vrijemepoc, slikatrofeja, brojzadataka, autorid, idklasenatjecanja, trofejid, slug) FROM stdin;
26	Spiderman competition	Full of webs	2022-01-23 07:12:56.040995	2022-01-23 04:12:56.040995	globe.png	1	50	1	3	spiderman-competition
31	trophy   testinggg	ajsjajaja	2022-01-23 07:12:56.040995	2022-01-23 04:12:56.040995	trophy_bb6d19df151d2f40ca388d39fe081e88.jpg	2	50	1	30	trophy-testinggg
15	DFC Championship	DFC Ultimate championship.	2021-12-23 21:50:00	2021-12-23 17:27:00	globe.png	1	62	1	3	dfc-championship
16	Infokup	Računalni algoritam je niz naredbi koji efikasno rješava neki problem. U ovoj kategoriji cilj je upravo osmisliti algoritam koji rješava zadani problem.\n\nMeđutim, zadani problemi su jako često složeni, pa je potrebno kombinacijom postojećih i osmišljavanjem novih algoritama doći do efikasnog rješenja.	2021-11-23 11:35:00	2021-11-23 09:00:00	globe.png	1	62	1	3	infokup
3	First competition	Welcome to the first Codeshark competition	2021-12-21 04:12:56.040995	2021-12-21 01:12:56.040995	nutella.png	2	62	1	2	first-competition
4	Second competition	This is the second Codeshark competition	2021-12-21 13:17:25.172848	2021-12-20 13:17:25.172848	globe.png	1	62	1	3	second-competition
21	a b		2022-01-13 14:04:31.530866	2022-01-12 14:04:31.530866	dog.png	1	70	1	1	a-b
30	Last attempt at this	ajsjajaja	2022-01-23 07:12:56.040995	2022-01-23 04:12:56.040995	globe.png	1	50	1	3	last-attempt-at-this
36	evo im done	last straw	2022-01-25 07:12:56.040995	2022-01-25 04:12:56.040995	globe.png	2	70	1	3	evo-im-done
37	Last competition	last straw	2022-01-26 07:12:56.040995	2022-01-26 04:12:56.040995	globe.png	1	50	1	3	last-competition
39	Paleton natjecanje	Ovo je gospodar vremena	2022-01-16 17:58:00	2022-01-15 03:53:00	trophy_98cb8b89641ded1f44c3d2b485988e98.png	2	58	1	55	paleton-natjecanje
46	private comp test3	private comp test	2022-02-02 16:45:00	2022-02-01 14:45:00	trophy_f835718ae4d88e08499d42f9da7489ea.jpg	1	59	1	69	private-comp-test3
47	Natjecanje za 2	dvojke su bitne	2022-01-16 22:59:00	2022-01-14 23:16:00	trophy_11cc10efb7444da3cd57b11bc66a6d68.jpg	1	59	1	70	natjecanje-za-2
48	printaj 2 competition	please print 2	2022-01-16 23:24:00	2022-01-15 07:18:00	trophy_43e1f5b49856a57c077b81f8fd1ddd7e.png	1	58	1	71	printaj-2-competition
49	Finalni Natjecanje Test	gg ez	2022-01-16 20:12:00	2022-01-15 20:00:00	trophy_77ad2c42e9c26c2abf0cd0b6c5d3e71c.png	2	62	1	72	finalni-natjecanje-test
50	Ultimate competition	Ultimate competition for all users	2022-01-15 22:37:30.170825	2022-01-15 10:22:00	trophy_1700f8d5d250e59bf50c3009eb0a56d8.png	1	59	1	73	ultimate-competition
44	Hackaton	Hackaton competition	2022-01-16 13:38:00	2022-01-14 13:40:00	trophy_66d7a4d2ca96e70c9986cd7fd597e9cf.jpg	1	62	1	66	hackaton
40	Late night competition	2am competition	2022-01-16 18:18:00	2022-01-15 01:18:00	trophy_0d07ff299aa5edd647e4137de7b31aa1.png	1	58	1	56	late-night-competition
41	I will be the winner	Only for the best	2022-01-16 19:38:00	2022-01-15 01:38:00	trophy_632b80ef85413b4a7492d6426faeb4bc.png	3	58	1	57	i-will-be-the-winner
\.


--
-- Data for Name: sesija; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.sesija (sesijaid, pocetaksesije, korisnikid) FROM stdin;
aisbhdisaidbniasbnsda	2022-01-14 20:15:14.21943	74
590a8a69621542c4a34bb2509bc00558	2022-01-14 23:02:22.434121	74
4f03b25317944ffda7d33acbafb7aa83	2022-01-14 23:17:12.338198	50
6544b5fe0eb04bd3b7aa6b9c4b06047f	2022-01-15 00:05:28.843416	62
4c034e5f67584c5c8de3d2b194d6039b	2022-01-15 00:11:29.170485	74
ce8b1fd854914daebcd30a29ce06cd9b	2022-01-15 00:17:56.749888	74
454692fac77f49aabb15fde3ef5c9435	2022-01-15 00:21:54.922109	58
a74e707a2c75483b91329bff05440344	2022-01-15 00:23:42.593421	57
b5f8e3279d14488082282a695bf9e5fe	2022-01-15 00:56:43.517634	62
e77e9ae9634447f1b568dc83cd06c991	2022-01-15 01:27:47.386668	58
46165e61d6cf4a93b155af359c80da9a	2022-01-15 01:28:54.9869	58
8e226704a27e491fa7b6388cdac4d743	2022-01-15 02:44:53.379831	58
0bb940f4e0ab4ad1932a7e6affc81b94	2022-01-15 10:57:11.838248	74
50361df4fdf041159836ddb344850f93	2022-01-15 10:57:25.714162	74
23c5651181754270b7e15d6c375cb3ba	2022-01-15 11:24:47.0908	72
05d320055e694f3788b20a80ddcc2b10	2022-01-15 11:26:22.146017	72
a92d27e80a00407fbdf09e9304ea64d2	2022-01-15 11:38:47.226273	62
218326ebb97f4ca289ee7867380aeb7e	2022-01-15 12:00:15.667654	58
399669ffce2d40b083f7f7342e8e3d04	2022-01-15 12:00:31.631832	74
ef75ffdee1be46e39fa65f47176986af	2022-01-15 12:29:01.611943	58
0ba2eeed33814c03890e2811a1530b34	2022-01-15 13:28:15.515834	62
bfc75ac602df4b4c8d19e730e69e224b	2022-01-15 13:29:19.319654	62
b35005191e544784b6e5b3ef5f3fe612	2022-01-15 13:39:28.097861	62
149eab8bb49e4ce9982c3fba7368a30b	2022-01-15 13:43:22.727213	74
cb67bd5b9de64ed7b39a5a20a1028421	2022-01-15 13:44:07.86627	59
0f9832d655364c6f867e3a00ca6c3141	2022-01-15 13:59:01.307175	62
77647513e7bf49b78723a5997905b667	2022-01-15 13:59:42.050618	60
9a8ad2170d0b4aadaf8f69c1dcb60c47	2022-01-15 16:30:04.112657	62
01d4191668e64247b74923933b5a8a05	2022-01-15 16:31:32.770326	57
dcc6724eec7e4bdbb661479b2b6e1d20	2022-01-15 18:04:39.473878	62
2149fe6bf0e04a9f9fa9ad923346fb34	2022-01-15 18:04:52.641988	54
e7ecefbc1ef04e24bcf5f525316af221	2022-01-15 18:05:24.044238	62
3b2721fddde54ac7a90b63ae24be2e75	2022-01-15 18:05:57.963141	62
6600b00187104c69a83adbad39ebd9c6	2022-01-15 18:06:14.625725	62
3ffd09d8ce8640d5b6fa1124fea37ec9	2022-01-15 18:06:55.414471	74
aae1f8fa1d06487cba55c804308b3d46	2022-01-15 18:07:21.362439	74
622b18376c25433a8a1cdf9f8648f444	2022-01-15 18:07:34.105246	60
cfe7aed455644aa789e6905716bc3003	2022-01-15 18:08:19.209411	62
52390acf5518448b82b1eb2692641a4e	2022-01-15 18:10:56.635776	74
a4c23a975e40444b97ba92ca3ccf1eea	2022-01-15 18:29:15.34306	84
33b5d4e3ea904304ae4ccf4f875b462d	2022-01-15 18:37:58.104383	33
17754eba3b0a4e91a2bbda2c5432ea62	2022-01-15 18:48:27.477147	57
70e58699cf194b3b95297b04134b762a	2022-01-15 18:48:50.332094	62
29b94b96ffc44941a3e5612bc41db4f2	2022-01-15 18:50:39.350375	60
8173201c3f274d4c881a4bd615806825	2022-01-15 18:51:35.875591	58
733f5dd1a6ad4650b999269f1f1ebce4	2022-01-15 18:51:50.600139	59
c403af491adc4555ab9572a2188aed66	2022-01-15 18:53:25.726717	57
f1f1b97f11804a679d98485fd6d1a22c	2022-01-15 18:59:02.839325	74
0137f7cd01384e68a0e8546b2d522221	2022-01-15 18:59:29.882631	62
1267fbb828fb4063bb00476893bab62a	2022-01-15 19:16:51.914295	58
3a180bd1977e4967a3b341b9d5503324	2022-01-15 19:40:07.930713	80
4aecee705fec4656ac79d1e1a66f634e	2022-01-15 20:04:35.633431	57
1698523248dd4d9ab9a6ca09d0b9e593	2022-01-15 20:07:12.797031	62
da70b0e313524adfb41f9484082031c8	2022-01-15 20:52:04.745447	74
a6ccfc2f417c437ca2718d20fe9c0255	2022-01-15 20:52:53.46976	74
f72389ccca874a8db13b322c68f20716	2022-01-15 21:24:47.368598	59
ba5d61722f4f481383d1d3d182ca7fc1	2022-01-15 22:22:46.583391	74
2b0fd792064142e1b74fe0c4dffa8a37	2022-01-15 22:23:46.199277	55
66c97bdde4e140f1a272199977fab494	2022-01-15 22:25:06.8225	59
fb04ba576be146b5b1e11a270cc0a0f3	2022-01-15 22:42:18.79143	62
e63ec03b5b7c457a9fe6695121f35166	2022-01-15 22:43:21.756354	62
9db8549d6474439f92af0a7ef44ae7b3	2022-01-15 22:43:58.987051	62
35bf26e5ef9844d487da9696646f998b	2022-01-15 22:49:03.585808	74
8e1f34fae46348f1a15aaaf590d6e831	2022-01-15 22:57:12.508096	72
e3d0c4e255e24cc89f27b037175c2ff1	2022-01-15 22:58:02.487226	62
7cb39ca6512f467e835909cb5cf24271	2022-01-15 22:59:26.974749	84
885b4b60ebc643cf8f9254b94f750c99	2022-01-15 23:10:09.948281	74
ec477048d8ea4954a73a80dad2efbe0c	2022-01-15 23:11:17.283636	74
91fc4dcf6d2c4abfb0c90f78cea530e0	2022-01-15 23:20:49.119999	62
d95f9208804d4240a022afbe7430499a	2022-01-15 23:22:34.421123	74
c73c0109c5ff4e4a8e63973ca4a3df5e	2022-01-15 23:36:35.524564	55
8be34cc1d5aa467f9f9ec6d24fa03766	2022-01-15 23:43:37.691404	62
\.


--
-- Data for Name: sudjelujena; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.sudjelujena (korisnikid, natjecanjeid) FROM stdin;
74	26
50	3
88	3
50	40
84	40
33	40
74	47
59	50
74	50
55	50
62	49
74	44
62	44
\.


--
-- Data for Name: testprimjer; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.testprimjer (ulaz, izlaz, zadatakid) FROM stdin;
1	1	7
keks	keks	7
njofra	njofra	7
69	69	7
123kaktus123	123kaktus123	7
flower,flow,flight	fl	6
dog,racecar,car		6
abc,abababa,abw	ab	6
absc,abababa,ag	a	6
gamma,germa,gago	g	6
5,2	7	2
6,1	7	2
24,13	37	2
45,24	69	2
1,1	2	2
gag	1	3
rar	true	3
bae	0	3
krek	0	3
racecar	1	3
pepep	1	3
smrad	0	3
5,3	2	5
3,4	-1	5
4124,2	4122	5
5,45	-40	5
1,1	0	5
gsfgdfgdfgd	1	31
aa	bb	18
0	0	32
13	14	27
ZadnjiTestCase	2	33
9	9	28
10	2	34
10	10	29
a0a0	a0a0	36
asd	asdf	30
a1a1	a1a1	36
a2a2	a2a2	36
a3a3	a3a3	36
a4a4	a4a4	36
a5a5	a5a5	36
a6a6	a6a6	36
a7a7	a7a7	36
a8a8	a8a8	36
a9a9	a9a9	36
141234124	4	37
513513513	4	37
431414141124124	4	37
asdasdas	4	37
fafafaf	4	37
gagagaga	4	37
asdsadasds	4	37
cascascasca	4	37
vavsavas	4	37
gsdgfsdgsd	4	37
fasfasfa	4	37
asfasfasfa	4	37
gagagagagag	4	37
csaffgadawfgawfga	4	37
213123	privatno	38
2	privatno	38
3	privatno	38
4	privatno	38
5	privatno	38
6	privatno	38
7	privatno	38
a	privatno	38
s	privatno	38
d	privatno	38
b	privatno	38
f	privatno	38
fasfas	privatno	38
xcy	privatno	38
bbb	privatno	38
fasfasf	privatno	38
dsgsdgsdgsdgsd	privatno	38
asfasfasfas	privatno	38
dfgsdvadsaf	privatno	38
fasfasfasfadadwd	privatno	38
1	6	39
2	6	39
3	6	39
46	6	39
56	6	39
6	6	39
7	6	39
8	6	39
9	6	39
10	6	39
11	6	39
1	6	40
26	6	40
3	6	40
4	6	40
5	6	40
6	6	40
7	6	40
86	6	40
9	6	40
10	6	40
\.


--
-- Data for Name: trofej; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.trofej (trofejid, imetrofeja, slikatrofeja) FROM stdin;
1	Doggo - early supporter	dog.png
53	Lorem ipsum	trophy_478d75dcd9f731d048f0de3c4217a43c.png
55	Paleton natjecanje	trophy_98cb8b89641ded1f44c3d2b485988e98.png
56	Ovo je 2 ujutro competition	trophy_0d07ff299aa5edd647e4137de7b31aa1.png
57	Ovo je moje testno natjeanje	trophy_632b80ef85413b4a7492d6426faeb4bc.png
58	BigaGiga	trophy_2ef034c417d1e55f74d81a3f2c18d324.jpg
3	Globe	globe.png
2	Sweet	nutella.png
63	BigaGigaPiga	trophy_ef8a3790a43af3d939d16e3a53dfcb7e.jpg
67	private comp test2	trophy_6bfbed3cc4eb931874474b65bc3d9344.jpg
69	private comp test3	trophy_f835718ae4d88e08499d42f9da7489ea.jpg
70	Natjecanje za 2	trophy_11cc10efb7444da3cd57b11bc66a6d68.jpg
71	printaj 2 competition	trophy_43e1f5b49856a57c077b81f8fd1ddd7e.png
72	Finalni Natjecanje Test	trophy_77ad2c42e9c26c2abf0cd0b6c5d3e71c.png
73	Kiflica	trophy_1700f8d5d250e59bf50c3009eb0a56d8.png
66	BigaGigaPiga2	trophy_66d7a4d2ca96e70c9986cd7fd597e9cf.jpg
30	Guess You'll Dieeee	trophy_bb6d19df151d2f40ca388d39fe081e88.jpg
\.


--
-- Data for Name: uploadrjesenja; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.uploadrjesenja (predanorjesenje, prolaznost, vrijemepredaje, prosjvrijemeizvrs, korisnikid, zadatakid) FROM stdin;
print(input())	0	2021-12-19 22:58:49.882368	1.0	74	7
print(input())	0.0	2022-01-09 17:41:24.607789	0.005700540542602539	74	7
print(input())	1.0	2022-01-09 17:49:11.360902	0.027028560638427734	74	7
a = input()\nprint(a if a in ['69', 'keks'] else 'aaaasdasdasfasfasasf')	0.4	2022-01-09 17:53:40.748467	0.02547144889831543	74	7
a = input()\nprint(a if a in ['1', 'keks'] else 'aaaasdasdasfasfasasf')	0.4	2022-01-09 17:55:10.164097	0.028189706802368163	74	7
print(input())	1.0	2022-01-10 02:10:33.045302	0.025484275817871094	74	7
print(input())	1.0	2022-01-14 01:03:23.89152	0.03169140815734863	72	7
print(input() + 1)	0.0	2022-01-14 01:03:48.442152	0.02632145881652832	72	7
print(42)	0.0	2022-01-14 01:11:51.965451	0.026830196380615234	72	7
print("keks")	0.2	2022-01-14 01:11:59.225488	0.02241668701171875	72	7
I give up	1.0	2022-01-14 01:10:45.320981	0.03277902603149414	72	2
print("idk")	0.0	2022-01-09 18:39:56.644621	0.02681736946105957	62	7
I don't know how	0.0	2022-01-14 11:27:10.966111	0.04470734596252442	74	7
print	0.0	2022-01-14 17:50:04.900313	0.08990268707275391	62	7
print()\n	0.0	2022-01-14 17:52:39.251181	0.02793097496032715	62	7
print(input())\n	1.0	2022-01-14 17:52:52.360864	0.027547883987426757	62	7
print(input())	1.0	2022-01-14 20:34:47.033334	0.03905653953552246	74	7
function add(int a, int b) {\n  return 4;\n}	0.0	2022-01-14 20:52:33.314311	0.030488061904907226	72	2
function add(int a, int b) {\n  return 4;\n}	0.0	2022-01-14 21:09:56.093849	0.026445770263671876	72	2
print(input())	1.0	2022-01-14 22:25:31.037381	0.032679176330566405	74	7
dasd	0.2	2022-01-14 22:36:16.449816	0.03188381195068359	54	6
	0.2	2022-01-14 22:36:27.640576	0.025177001953125	54	6
function add(a, b) {\n  return a + b;\n}	0.2	2022-01-14 22:42:01.596757	0.03207869529724121	54	6
asfas	0.0	2022-01-14 22:42:28.160422	0.02923102378845215	54	2
	0.0	2022-01-14 22:42:31.84252	0.024955606460571288	54	2
asd	0.0	2022-01-14 22:42:44.15022	0.0297548770904541	54	3
\tfunction add(a, b) { return a + b; }	0.2	2022-01-14 22:43:22.356636	0.027579021453857423	54	6
asd	0.2	2022-01-14 22:43:26.828325	0.027956008911132812	54	6
print(input())\n	1.0	2022-01-14 23:04:41.115809	0.026486730575561522	62	7
kekw\n	0.0	2022-01-14 23:04:46.798566	0.027365875244140626	62	7
print(input())\n	1.0	2022-01-14 23:04:57.31612	0.02507128715515137	62	7
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-14 23:17:49.293721	0.028952598571777344	62	2
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-14 23:17:56.205653	0.033147239685058595	62	7
int main(void) {return 12;}	0.0	2022-01-14 23:37:15.674707	0.006120204925537109	50	7
#include <stdio.h>\n int main(void) {char inp[512]; scanf("%s", inp); printf("%s", inp);}	1.0	2022-01-14 23:38:44.018593	0.007378911972045899	50	7
#include <stdio.h>\n int main(void) {char inp[512]; scanf("%s", inp); printf("%s", inp);}	1.0	2022-01-14 23:43:53.394275	0.006085777282714843	50	7
print(input())	1.0	2022-01-15 00:30:46.897921	0.03607730865478516	58	7
print(input())	0.0	2022-01-15 01:04:22.28967	0.024898529052734375	58	6
print(input())	0.0	2022-01-15 01:08:35.200028	0.028129053115844727	58	6
print(input())	0.0	2022-01-15 01:32:21.137187	0.03680906295776367	58	6
print("fl")	0.2	2022-01-15 01:32:34.153917	0.02401723861694336	58	6
print(input())	1.0	2022-01-15 01:59:36.751507	0.029772090911865234	58	7
#include <stdio.h>\nint main(void) {\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	1.0	2022-01-15 02:01:01.216179	0.018311071395874023	58	7
print(input())	1.0	2022-01-15 02:03:27.954546	0.025992965698242186	58	7
print(input())	0.0	2022-01-15 02:38:59.695578	0.032805442810058594	58	30
print(input())	1.0	2022-01-15 02:39:03.810668	0.046799659729003906	58	28
print(input())	1.0	2022-01-15 02:39:08.150088	0.03414607048034668	58	29
3	0.0	2022-01-15 11:39:05.078913	0.07907724380493164	62	30
print(3)\n	0.0	2022-01-15 11:39:11.391268	0.03479433059692383	62	30
help\n	0.0	2022-01-15 11:53:52.657328	0.04165935516357422	62	27
function add(a, b) {\n  return a + b;\n}	0.2	2022-01-15 11:54:18.727837	0.030372762680053712	62	6
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 11:54:24.086636	0.02413792610168457	62	2
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 11:54:28.375818	0.028659582138061523	62	3
print(1)	1.0	2022-01-15 13:46:08.91044	0.08896470069885254	62	31
print(0)	0.0	2022-01-15 13:46:40.137776	0.037592172622680664	62	31
print(1)	1.0	2022-01-15 13:51:25.45338	0.03409624099731445	62	31
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 14:07:08.071842	0.09624276161193848	60	2
print("gas")	0.0	2022-01-15 16:26:21.507261	0.03833284378051758	60	7
print(input())	0.0	2022-01-15 16:26:38.866873	0.02975287437438965	60	7
print(input())	0.0	2022-01-15 16:27:13.857144	0.026581621170043944	60	7
print(2)	0.0	2022-01-15 16:27:50.85337	0.03152942657470703	60	31
print(1)	0.0	2022-01-15 16:28:13.059011	0.02822709083557129	60	31
print(1)	0.0	2022-01-15 16:28:17.191082	0.0237274169921875	60	31
print(1)	0.0	2022-01-15 16:28:28.870772	0.03081369400024414	60	31
print(1)	0.0	2022-01-15 16:28:41.025189	0.025033950805664062	60	31
print(1)	0.0	2022-01-15 16:28:50.157989	0.030089378356933594	60	31
print(1)	0.0	2022-01-15 16:29:25.078368	0.03410911560058594	60	31
print(2)	0.0	2022-01-15 16:29:32.578583	0.03039073944091797	60	31
print(0)	0.0	2022-01-15 16:29:36.365681	0.03579235076904297	60	31
print(1)	0.0	2022-01-15 16:29:40.31882	0.03149557113647461	60	31
print(2)	0.0	2022-01-15 16:30:25.828198	0.02668905258178711	62	31
print(1)	1.0	2022-01-15 16:30:30.496123	0.02756524085998535	62	31
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 16:32:29.056371	0.03243207931518555	57	18
asdsadas	0.0	2022-01-15 17:57:00.988516	0.030988073348999022	57	2
uga buga	0.0	2022-01-15 18:06:26.028884	0.026960992813110353	62	2
a = input()\nb = input()\nprint(a+b)	0.0	2022-01-15 18:09:54.679001	0.028142547607421874	59	2
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 18:10:20.645915	0.02875666618347168	59	2
uga buga	0.0	2022-01-15 18:10:28.457251	0.024260616302490233	62	2
print(1)\n	1.0	2022-01-15 18:11:10.935565	0.026157617568969727	74	31
print(1)\n	1.0	2022-01-15 18:11:22.518031	0.02402663230895996	74	31
print(input())	0.2	2022-01-15 16:27:08.251435	0.04177460670471191	60	7
print(input())	1.0	2022-01-15 18:49:00.854455	0.03187394142150879	57	7
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 18:49:23.906605	0.026162004470825194	62	2
print(input())	1.0	2022-01-15 18:54:59.294556	0.0286834716796875	57	7
#include <stdio.h>\nint main(void)\n{\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	1.0	2022-01-15 18:56:20.273618	0.007258224487304688	57	7
#include <stdio.h>\nint main(void)\n{\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	1.0	2022-01-15 18:56:27.471624	0.008400964736938476	57	7
print(2)\n	0.0	2022-01-15 18:59:21.974756	0.0325322151184082	74	31
print(12)	0.0	2022-01-15 18:59:34.279464	0.029249906539916992	74	31
print(1)	1.0	2022-01-15 18:59:37.128002	0.024354219436645508	74	31
print(input())	1.0	2022-01-15 19:00:01.302697	0.073284912109375	74	7
print(input()+1)	0.0	2022-01-15 19:00:05.628094	0.030090808868408203	74	7
#include <stdio.h>\nint main(void)\n{\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	1.0	2022-01-15 19:01:48.764029	0.007242536544799805	57	7
asdas	0.0	2022-01-15 19:03:09.074188	0.026441335678100586	59	33
asdsada	0.0	2022-01-15 19:03:32.411378	0.030450105667114258	59	18
a+b	0.0	2022-01-15 19:05:25.870321	0.028391408920288085	59	2
a+b	0.0	2022-01-15 19:05:29.2059	0.03137087821960449	59	2
dasdasdsad	0.0	2022-01-15 19:05:34.638041	0.030257701873779297	59	2
dasdasdas	0.0	2022-01-15 19:05:46.292573	0.0330815315246582	59	29
asdasdasdsa	0.0	2022-01-15 19:06:57.941373	0.028595685958862305	59	29
asda	0.2	2022-01-15 19:07:36.237511	0.02599024772644043	59	6
print(2)	1.0	2022-01-15 19:19:26.711893	0.024770498275756836	58	34
#include <stdio.h>\nint main(void)\n{\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	0.0	2022-01-15 20:04:45.741587	0.0252840518951416	57	7
#include <stdio.h>\nint main(void)\n{\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	1.0	2022-01-15 20:04:57.263023	0.007640218734741211	57	7
#include <stdio.h>\nint main(void)\n{\n  char inp[512];\n  scanf("%s", inp);\n  printf("%s", inp);\n}	1.0	2022-01-15 20:05:02.9041	0.008149194717407226	57	7
print(4)\n	1.0	2022-01-15 20:11:56.128424	0.02763949121747698	62	37
print("privatno")\n	1.0	2022-01-15 20:12:24.854922	0.024018263816833495	62	38
asfasfe wr1cv24 1cf4v 32	0.0	2022-01-15 20:19:44.863526	0.02876420021057129	57	7
asfasfe wr1cv24 1cf4v 32	0.0	2022-01-15 20:29:19.719051	0.06262526512145997	57	7
print(input()+1)	0.0	2022-01-15 20:38:58.477173	0.028387832641601562	74	7
print(4)	1.0	2022-01-15 20:42:00.641578	0.028318609510149275	74	37
print("javno")	0.0	2022-01-15 20:42:15.336044	0.02959299087524414	74	38
print("privatno")	1.0	2022-01-15 20:42:21.26044	0.026630866527557372	74	38
print(2)	1.0	2022-01-15 20:54:03.742534	0.027862548828125	74	33
print(3)	0.0	2022-01-15 20:54:08.949054	0.026856660842895508	74	33
print(2)	1.0	2022-01-15 20:54:17.795911	0.025319814682006836	74	33
function add(a, b) {\n  return a + b;\n}asd	0.0	2022-01-15 20:58:39.714113	0.027429580688476562	74	33
function add(a, b) {\n  return a + b;\n}sd	0.0	2022-01-15 21:03:10.312274	0.029684782028198242	74	33
void main() {\n  return 0;\n}	0.0	2022-01-15 21:04:12.101346	0.025916337966918945	74	33
print(6)	1.0	2022-01-15 21:30:32.927115	0.031246293674815784	59	39
print(7)	0.0	2022-01-15 22:23:09.531415	0.02531852722167969	74	40
print(6)	1.0	2022-01-15 22:23:13.686552	0.02841362953186035	74	40
print(2)	0.0	2022-01-15 22:24:24.61306	0.026080894470214843	55	40
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 22:34:11.78899	0.03774757385253906	62	2
asdasdas	0.0	2022-01-15 22:34:50.264102	0.025608539581298828	62	2
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 22:48:48.449123	0.028831863403320314	62	2
print(2)	1.0	2022-01-15 22:57:33.849665	0.029222488403320312	62	33
print(2)	0.0	2022-01-15 22:58:31.56464	0.02650146484375	72	40
print(6)	1.0	2022-01-15 22:59:19.983875	0.02823672294616699	72	40
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 23:00:40.896884	0.023514318466186523	84	40
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 23:00:45.86188	0.026590704917907715	84	40
print(5)	0.0	2022-01-15 23:01:09.256044	0.030234456062316895	84	40
print(5)	0.0	2022-01-15 23:01:09.453157	0.03047628402709961	84	40
print(5)	0.0	2022-01-15 23:01:09.451088	0.03294925689697266	84	40
print(6)	1.0	2022-01-15 23:01:15.966824	0.027381110191345214	84	40
print(2)	1.0	2022-01-15 23:02:48.852464	0.02779674530029297	84	33
function add(a, b) {\n  return a + b;\n}	0.0	2022-01-15 23:04:28.956816	0.026152610778808594	84	18
print('bb')	1.0	2022-01-15 23:05:08.988497	0.025822162628173828	84	18
print(1)	1.0	2022-01-15 23:26:00.787879	0.030520915985107422	62	31
#include <stdio.h> int main(void) {char inp[512]; scanf("%s", inp); printf("%s", inp);}	0.0	2022-01-15 23:34:28.987276	0.027929258346557618	62	7
#include <stdio.h>\nint main(void) {char inp[512]; scanf("%s", inp); printf("%s", inp);}	1.0	2022-01-15 23:35:08.250629	0.010443878173828126	62	7
print(2)	0.0	2022-01-15 23:35:43.571758	0.024171829223632812	62	31
print(1)	1.0	2022-01-15 23:35:48.963836	0.02489185333251953	62	31
print(input())	1.0	2022-01-15 23:38:19.015908	0.025612878799438476	55	7
\.


--
-- Data for Name: virtnatjecanje; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.virtnatjecanje (virtnatjecanjeid, vrijemekreacije, korisnikid, natjecanjeid, zadaci) FROM stdin;
2	2021-12-20 01:56:50.682532	74	\N	{2,3,6}
4	2021-12-20 01:59:29.370985	74	\N	{6,2,3}
5	2021-12-20 02:16:47.145463	74	\N	{3,7}
3	2021-12-20 01:57:23.655847	74	3	\N
14	2021-12-21 02:54:38.517585	50	4	\N
15	2021-12-21 02:54:53.791832	50	4	\N
16	2021-12-21 02:58:43.774927	50	\N	{7}
17	2021-12-21 12:11:17.033525	50	\N	{2,3,6}
18	2022-01-09 19:40:12.621841	74	26	\N
19	2022-01-11 12:04:10.721159	50	21	\N
22	2022-01-11 14:42:13.307416	50	21	\N
23	2022-01-11 14:42:39.056598	50	21	\N
24	2022-01-11 14:42:57.089866	50	\N	{7,8,2}
25	2022-01-13 18:57:03.849752	50	\N	{2,7,8,15,16,18}
26	2022-01-13 19:02:08.203111	50	\N	{2,3,6,15,16,17,18}
27	2022-01-14 00:45:45.724382	50	\N	{2,3,8,15,16}
28	2022-01-14 00:47:37.199411	50	\N	{6,18,2,15,18}
29	2022-01-14 00:48:03.668272	50	\N	{6,18,15,8,17,16,7,16,3}
31	2022-01-14 00:49:55.78843	50	21	\N
32	2022-01-14 17:58:03.306937	72	\N	{2,8,17,7,3}
33	2022-01-14 18:20:49.617889	74	\N	{18,15,8,17,3}
34	2022-01-14 18:49:40.587379	72	\N	{8,17}
35	2022-01-14 23:16:35.962956	62	\N	{7,2,15}
36	2022-01-14 23:16:48.913635	62	\N	{6,2,15,8,3}
37	2022-01-14 23:17:27.562842	62	\N	{6,18,15,16}
38	2022-01-14 23:23:52.110535	74	\N	{6,18,2,15,8,16,7,16,3}
39	2022-01-14 23:25:02.289387	74	\N	{6,18,2,15,8,17,16,16,3}
41	2022-01-15 00:22:12.496656	58	\N	{6,16,18}
42	2022-01-15 00:24:19.970891	58	\N	{6,18,8,17,17,7,3}
43	2022-01-15 00:29:00.210698	58	\N	{6,18,2,15,8,16,16,3}
44	2022-01-15 00:29:21.900662	58	\N	{7}
45	2022-01-15 00:30:57.295267	58	\N	{17}
46	2022-01-15 00:31:02.206557	58	\N	{6}
47	2022-01-15 01:04:12.11587	58	\N	{6,8,8}
50	2022-01-15 01:31:51.249224	58	4	\N
51	2022-01-15 01:54:43.912241	58	39	\N
52	2022-01-15 02:03:20.559719	58	\N	{6,17,7}
53	2022-01-15 14:06:58.998735	60	\N	{17,2}
54	2022-01-15 18:09:39.346262	59	21	\N
55	2022-01-15 18:10:18.250208	59	21	\N
56	2022-01-15 18:49:20.484238	62	21	\N
59	2022-01-15 19:05:39.368003	59	\N	{8,29,8}
60	2022-01-15 19:07:12.156673	59	15	\N
61	2022-01-15 19:07:32.442442	59	4	\N
62	2022-01-15 19:31:52.292131	60	3	\N
63	2022-01-15 19:40:32.258472	80	3	\N
64	2022-01-15 20:16:32.448381	74	21	\N
67	2022-01-15 22:49:18.844852	74	21	\N
69	2022-01-15 22:58:03.084477	72	21	\N
71	2022-01-15 22:58:25.134318	72	50	\N
72	2022-01-15 23:00:08.901749	84	50	\N
\.


--
-- Data for Name: zadatak; Type: TABLE DATA; Schema: public; Owner: codeshark_user
--

COPY public.zadatak (zadatakid, imezadatka, bodovi, maxvrijemeizvrs, tekstzadatka, privatnost, slug, autorid, natjecanjeid) FROM stdin;
5	Sub 2 numbers	1	2.5	Given two numbers, your task is to sub them and return the answer	t	sub-2-numbers	62	\N
7	Return The Input	1	1	Return the input string 	f	return-the-input	70	3
6	Longest Common Prefix	2	2	Find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string. Inputs are strings with the from like\n\t\t: flower,flow,flight 	f	longest-common-prefix	62	4
18	Test zad 4	3	3.5	fake task	f	test-zad-4	58	39
17	Test zad 3	5	7.5	fake task	f	test-zad-3	58	39
27	Ovo je moj task u 2 ujutro	1	1	kasno je. help.	f	ovo-je-moj-task-u-2-ujutro	58	40
30	Privatni problem 3	1	1	Privatni problem 33333	f	privatni-problem-3	58	41
28	Privatni problem	1	1	ovo je privatni probem	f	privatni-problem	58	41
29	Privatni problem 2	1	1	Privatni problem 2 electric boogaloo	f	privatni-problem-2	58	41
31	GigaBiga	1	1	Rješenje je print(1)	f	gigabiga	62	44
32	private task test	1	1	private task testprivate task testprivate task testprivate task testprivate task testprivate task test	f	private-task-test	59	46
33	Nemoj printat dvojku	4	1	nemoj pisat print(2)	f	nemoj-printat-dvojku	59	47
2	Sum 2 numbers	1	2.5	Given two numbers, your task is to sum them and return the answer	f	sum-2-numbers	62	21
8	Area of a sphere	3	3.5	Calcualate an area of a sphere	f	area-of-a-sphere	50	30
34	Ovo je moj testni tesk	1	1	print(2) je rjesenje	f	ovo-je-moj-testni-tesk	58	48
3	Palindrome	1	2.5	Given a string, check if it is a palindrome	f	palindrome	70	3
15	Test zad 1	4	5.0	fake task	f	test-zad-1	70	26
16	Test zad 2	5	7.5	fake task	f	test-zad-2	70	36
36	molim te proradi	1	1	znam da neces	t	molim-te-proradi	57	\N
37	test za casove	5	1	print(4)	f	test-za-casove	62	49
38	ovo nije privatno	1	1	print("privatno")	f	ovo-nije-privatno	62	49
39	brand new public task	1	1	print(6)	f	brand-new-public-task	59	\N
40	brand new private task	1	1	print(6)	f	brand-new-private-task	59	50
\.


--
-- Name: korisnik_korisnikid_seq; Type: SEQUENCE SET; Schema: public; Owner: codeshark_user
--

SELECT pg_catalog.setval('public.korisnik_korisnikid_seq', 97, true);


--
-- Name: natjecanje_natjecanjeid_seq; Type: SEQUENCE SET; Schema: public; Owner: codeshark_user
--

SELECT pg_catalog.setval('public.natjecanje_natjecanjeid_seq', 50, true);


--
-- Name: trofej_trofejid_seq; Type: SEQUENCE SET; Schema: public; Owner: codeshark_user
--

SELECT pg_catalog.setval('public.trofej_trofejid_seq', 73, true);


--
-- Name: virtnatjecanje_virtnatjecanjeid_seq; Type: SEQUENCE SET; Schema: public; Owner: codeshark_user
--

SELECT pg_catalog.setval('public.virtnatjecanje_virtnatjecanjeid_seq', 73, true);


--
-- Name: zadatak_zadatakid_seq; Type: SEQUENCE SET; Schema: public; Owner: codeshark_user
--

SELECT pg_catalog.setval('public.zadatak_zadatakid_seq', 40, true);


--
-- Name: jeosvojio jeosvojio_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.jeosvojio
    ADD CONSTRAINT jeosvojio_pkey PRIMARY KEY (korisnikid, trofejid);


--
-- Name: klasanatjecanja klasanatjecanja_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.klasanatjecanja
    ADD CONSTRAINT klasanatjecanja_pkey PRIMARY KEY (idklasenatjecanja);


--
-- Name: korisnik korisnik_email_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.korisnik
    ADD CONSTRAINT korisnik_email_key UNIQUE (email);


--
-- Name: korisnik korisnik_korisnickoime_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.korisnik
    ADD CONSTRAINT korisnik_korisnickoime_key UNIQUE (korisnickoime);


--
-- Name: korisnik korisnik_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.korisnik
    ADD CONSTRAINT korisnik_pkey PRIMARY KEY (korisnikid);


--
-- Name: natjecanje natjecanje_imenatjecanja_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje
    ADD CONSTRAINT natjecanje_imenatjecanja_key UNIQUE (imenatjecanja);


--
-- Name: natjecanje natjecanje_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje
    ADD CONSTRAINT natjecanje_pkey PRIMARY KEY (natjecanjeid);


--
-- Name: natjecanje natjecanje_slug_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje
    ADD CONSTRAINT natjecanje_slug_key UNIQUE (slug);


--
-- Name: sesija sesija_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.sesija
    ADD CONSTRAINT sesija_pkey PRIMARY KEY (sesijaid);


--
-- Name: sudjelujena sudjelujena_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.sudjelujena
    ADD CONSTRAINT sudjelujena_pkey PRIMARY KEY (korisnikid, natjecanjeid);


--
-- Name: testprimjer testprimjer_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.testprimjer
    ADD CONSTRAINT testprimjer_pkey PRIMARY KEY (ulaz, zadatakid);


--
-- Name: trofej trofej_imetrofeja_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.trofej
    ADD CONSTRAINT trofej_imetrofeja_key UNIQUE (imetrofeja);


--
-- Name: trofej trofej_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.trofej
    ADD CONSTRAINT trofej_pkey PRIMARY KEY (trofejid);


--
-- Name: uploadrjesenja uploadrjesenja_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.uploadrjesenja
    ADD CONSTRAINT uploadrjesenja_pkey PRIMARY KEY (vrijemepredaje, korisnikid, zadatakid);


--
-- Name: virtnatjecanje virtnatjecanje_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.virtnatjecanje
    ADD CONSTRAINT virtnatjecanje_pkey PRIMARY KEY (virtnatjecanjeid);


--
-- Name: zadatak zadatak_imezadatka_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_imezadatka_key UNIQUE (imezadatka);


--
-- Name: zadatak zadatak_pkey; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_pkey PRIMARY KEY (zadatakid);


--
-- Name: zadatak zadatak_slag_key; Type: CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_slag_key UNIQUE (slug);


--
-- Name: jeosvojio jeosvojio_korisnikid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.jeosvojio
    ADD CONSTRAINT jeosvojio_korisnikid_fkey FOREIGN KEY (korisnikid) REFERENCES public.korisnik(korisnikid);


--
-- Name: jeosvojio jeosvojio_trofejid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.jeosvojio
    ADD CONSTRAINT jeosvojio_trofejid_fkey FOREIGN KEY (trofejid) REFERENCES public.trofej(trofejid);


--
-- Name: natjecanje natjecanje_autorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje
    ADD CONSTRAINT natjecanje_autorid_fkey FOREIGN KEY (autorid) REFERENCES public.korisnik(korisnikid);


--
-- Name: natjecanje natjecanje_idklasenatjecanja_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje
    ADD CONSTRAINT natjecanje_idklasenatjecanja_fkey FOREIGN KEY (idklasenatjecanja) REFERENCES public.klasanatjecanja(idklasenatjecanja);


--
-- Name: natjecanje natjecanje_trofejid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.natjecanje
    ADD CONSTRAINT natjecanje_trofejid_fkey FOREIGN KEY (trofejid) REFERENCES public.trofej(trofejid);


--
-- Name: sesija sesija_korisnikid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.sesija
    ADD CONSTRAINT sesija_korisnikid_fkey FOREIGN KEY (korisnikid) REFERENCES public.korisnik(korisnikid);


--
-- Name: sudjelujena sudjelujena_korisnikid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.sudjelujena
    ADD CONSTRAINT sudjelujena_korisnikid_fkey FOREIGN KEY (korisnikid) REFERENCES public.korisnik(korisnikid);


--
-- Name: sudjelujena sudjelujena_natjecanjeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.sudjelujena
    ADD CONSTRAINT sudjelujena_natjecanjeid_fkey FOREIGN KEY (natjecanjeid) REFERENCES public.natjecanje(natjecanjeid);


--
-- Name: testprimjer testprimjer_zadatakid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.testprimjer
    ADD CONSTRAINT testprimjer_zadatakid_fkey FOREIGN KEY (zadatakid) REFERENCES public.zadatak(zadatakid);


--
-- Name: uploadrjesenja uploadrjesenja_korisnikid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.uploadrjesenja
    ADD CONSTRAINT uploadrjesenja_korisnikid_fkey FOREIGN KEY (korisnikid) REFERENCES public.korisnik(korisnikid);


--
-- Name: uploadrjesenja uploadrjesenja_zadatakid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.uploadrjesenja
    ADD CONSTRAINT uploadrjesenja_zadatakid_fkey FOREIGN KEY (zadatakid) REFERENCES public.zadatak(zadatakid);


--
-- Name: virtnatjecanje virtnatjecanje_korisnikid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.virtnatjecanje
    ADD CONSTRAINT virtnatjecanje_korisnikid_fkey FOREIGN KEY (korisnikid) REFERENCES public.korisnik(korisnikid);


--
-- Name: virtnatjecanje virtnatjecanje_natjecanjeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.virtnatjecanje
    ADD CONSTRAINT virtnatjecanje_natjecanjeid_fkey FOREIGN KEY (natjecanjeid) REFERENCES public.natjecanje(natjecanjeid);


--
-- Name: zadatak zadatak_autorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_autorid_fkey FOREIGN KEY (autorid) REFERENCES public.korisnik(korisnikid);


--
-- Name: zadatak zadatak_natjecanjeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codeshark_user
--

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_natjecanjeid_fkey FOREIGN KEY (natjecanjeid) REFERENCES public.natjecanje(natjecanjeid);


--
-- PostgreSQL database dump complete
--

