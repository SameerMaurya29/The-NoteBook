import {ALGORITHMS} from '../src/content/dsa/algorithms.js';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
const root=await mkdtemp(join(process.env.SESSION_DIR||tmpdir(),'dsa-fixtures-'));
const code=(id,lang)=>ALGORITHMS.find(a=>a.id===id).code[lang];
const cpp=`#include <vector>\n#include <queue>\n#include <climits>\n#include <stdexcept>\n#include <algorithm>\n#include <iostream>\nusing namespace std;\nvector<int> order;\n${code('quick-sort','cpp')}\n${code('dijkstra','cpp')}\n${code('dfs','cpp').replace('vis[u]=true;','vis[u]=true; order.push_back(u);')}
int main(){
 for(vector<int> a:vector<vector<int>>{{},{1},{3,1,4,1,5},{1,2,3,4},{4,3,2,1}}){auto expected=a;sort(expected.begin(),expected.end());quickSort(a,0,(int)a.size()-1);if(a!=expected)return 1;}
 vector<vector<int>> g={{1,2},{0,3},{0,3},{1,2}};vector<bool> visited(4,false);dfs(g,0,visited);if(order!=vector<int>({0,1,3,2}))return 2;
 vector<vector<pair<int,int>>> w(5);w[0]={{1,2000000000},{2,5}};w[2]={{1,1}};w[1]={{3,2000000000}};
 auto d=dijkstra(w,0);if(d!=vector<long long>({0,6,5,2000000006LL,LLONG_MAX}))return 3;
 w[0]={{1,2000000000}};w[1]={{3,2000000000}};d=dijkstra(w,0);if(d[3]!=4000000000LL)return 4;
 w[4]={{0,-1}};try{dijkstra(w,0);return 5;}catch(const invalid_argument&){}
 cout<<"PASS C++ Quick Sort, DFS trace, Dijkstra large distances/unreachable/negative weights";
}`;
const java=`import java.util.*;\npublic class Demo {\nList<Integer> order=new ArrayList<>();\n${code('quick-sort','java')}\n${code('dijkstra','java')}\n${code('dfs','java').replace('vis[u]=true;','vis[u]=true; order.add(u);')}
public static void main(String[] args){Demo x=new Demo();
 for(int[] a:new int[][]{{},{1},{3,1,4,1,5},{1,2,3,4},{4,3,2,1}}){int[] expected=a.clone();Arrays.sort(expected);x.quickSort(a,0,a.length-1);if(!Arrays.equals(a,expected))throw new AssertionError("sort");}
 List<List<Integer>> g=Arrays.asList(Arrays.asList(1,2),Arrays.asList(0,3),Arrays.asList(0,3),Arrays.asList(1,2));x.dfs(g,0,new boolean[4]);if(!x.order.equals(Arrays.asList(0,1,3,2)))throw new AssertionError("DFS");
 List<List<int[]>> w=new ArrayList<>();for(int i=0;i<5;i++)w.add(new ArrayList<>());
 w.get(0).add(new int[]{1,2000000000});w.get(0).add(new int[]{2,5});w.get(2).add(new int[]{1,1});w.get(1).add(new int[]{3,2000000000});
 long[] d=x.dijkstra(w,0);if(!Arrays.equals(d,new long[]{0,6,5,2000000006L,Long.MAX_VALUE}))throw new AssertionError("dist");
 w.get(0).remove(1);d=x.dijkstra(w,0);if(d[3]!=4000000000L)throw new AssertionError("overflow");
 w.get(4).add(new int[]{0,-1});try{x.dijkstra(w,0);throw new AssertionError("negative");}catch(IllegalArgumentException expected){}
 System.out.println("PASS Java Quick Sort, DFS trace, Dijkstra large distances/unreachable/negative weights");
}}`;
function run(command,args){const r=spawnSync(command,args,{encoding:'utf8',timeout:30000});if(r.status!==0)throw Error(`${command}: ${r.stderr||r.stdout||r.error?.message}`);if(r.stdout)console.log(r.stdout);}
try {
 await writeFile(join(root,'fixture.cpp'),cpp);await writeFile(join(root,'Demo.java'),java);
 run('clang++',['-std=c++17',join(root,'fixture.cpp'),'-o',join(root,'fixture')]);run(join(root,'fixture'),[]);
 run('javac',['-encoding','UTF-8',join(root,'Demo.java')]);run('java',['-cp',root,'Demo']);
}finally{await rm(root,{recursive:true,force:true});}
